import { Component, DoCheck, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { state, style, animate, transition, trigger, AnimationEvent } from "@angular/animations";

import { MongoImageServices } from "../../services/mongoImage.services";
import { MongoImageModel } from "../../models/mongoImage.model";
import { AppModalServices } from "../../services/app-modal.services";

const autoComplete = require('../../../js/autoComplete.js');

const $ = require('jquery');

@Component({
  selector: 'app-search-field',
  template: require('./search-field.component.pug'),
  styleUrls: ['./search-field.component.scss'],
  animations: [
    trigger('search', [
      state('*', style({
        width: '25px',
        background: 'transparent'
      })),
      state('openSearch', style({
        width: '200px',
        position: 'absolute',
        transform: 'translate(75px,75px)',
        opacity: 0.75,
        background: 'white',
        color: 'black',
        zIndex: 1000,
      })),
      transition('* => openSearch', [
        animate('200ms')
      ]),
      transition('openSearch => *', [
        animate('100ms')
      ])
    ]),
  ]
})

export class SearchFieldComponent implements OnInit {
  private searchState: string;
  private searchIsDone: boolean = true;
  private searchTerms: any ;
  private autoCompleteElement : HTMLInputElement;
  private images: any;
  private modalSource: string;

  constructor(
    private mongoImageService: MongoImageServices,
    private modal: AppModalServices
  ) {
    this.mongoImageService.onUpdatedSearchTerms.subscribe((terms: any) => {
      if (terms) {
        this.searchTerms = terms;
      }
    })
  }

  @HostListener('click', ['$event']) onClickHandler(event: MouseEvent) {
    this.searchIsDone = false;
    this.searchState = 'openSearch';
    this.autoCompleteElement.focus();
  }

  @HostListener('document:keyup', ['$event']) keyupEventHandler(event: KeyboardEvent) {
    if (event.key == 'Escape') {
      if (document.querySelector("#autoComplete_list")) {
        document.querySelector("#autoComplete_list").remove();
      }
      this.autoCompleteElement.value = '';
      this.searchState = null;
    }
  }

  ngOnInit(): void {
    this.autoCompleteElement = document.querySelector("#autoComplete") as HTMLInputElement;
  }

  onBegin(event: AnimationEvent) { }

  onSelection(item: any) {
    let selection = item.selection.value;
    let model = new MongoImageModel();

    this.autoCompleteElement.blur();

    if ( document.querySelector("#autoComplete_list")) {
      document.querySelector("#autoComplete_list").remove();
    }

    switch(selection.queryTerm) {
      case 'location.city'    :
        model.setCity(selection.title);
        break;
      case 'location.state'   :
        model.setState(selection.title);
        break;
      case 'location.country' :
        model.setCountry(selection.title);
        break;
      case 'meta.names'       :
        model.setNames(selection.title);
        break;
      case 'meta.keywords'    :
        model.setKeywords(selection.title);
        break;
      case 'meta.occasion'    :
        model.setOccasion(selection.title);
        break;
      case 'meta.venue'       :
        model.setVenue(selection.title);
        break;
    }

    this.mongoImageService.search(model, true, true)
      .subscribe((result: any) => {
        this.autoCompleteElement.value = '';
        this.searchState = null;
        this.modal.initialise(result.docs, 0);
      })
  }

  onDone(event: AnimationEvent) {
    let inputField = event.element;

    if (event.toState =='openSearch') {

      new autoComplete({
          data: {                              // Data src [Array, Function, Async] | (REQUIRED)
            src: async () => {
              const query = inputField.value;
              const data = this.searchTerms;
              return data;
            },
            key: ["title"],
            cache: false
          },
          // query: {                               // Query Interceptor               | (Optional)
          //       manipulate: (query:any) => {
          //         return query.replace("pizza", "burger");
          //       }
          // },
          sort: (a:any , b:any) => {                    // Sort rendered results ascendingly | (Optional)
              if (a.match < b.match) return -1;
              if (a.match > b.match) return 1;
              return 0;
          },
          placeHolder: "enter search terms ...",     // Place Holder text                 | (Optional)
          selector: "#autoComplete",           // Input field selector              | (Optional)
          threshold: 1,                        // Min. Chars length to start Engine | (Optional)
          debounce: 300,                       // Post duration for engine to start | (Optional)
          searchEngine: "strict",              // Search Engine type/mode           | (Optional)
          resultsList: {                       // Rendered results list object      | (Optional)
              render: true,
              container: (source:any) => {
                  source.setAttribute("id", "autoComplete_list");
              },
              destination: document.querySelector("#autoComplete"),
              position: "afterend",
              element: "ul"
          },
          maxResults: 5,                         // Max. number of rendered results | (Optional)
          highlight: true,                       // Highlight matching results      | (Optional)
          resultItem: {                          // Rendered result item            | (Optional)
              content: (data:any, source:any) => {
                  source.innerHTML = data.match;
              },
              element: "li"
          },
          noResults: () => {                     // Action script on noResults      | (Optional)
              const result = document.createElement("li");
              result.setAttribute("class", "no_result");
              result.setAttribute("tabindex", "1");
              result.innerHTML = "Not Found";
              document.querySelector("#autoComplete_list").appendChild(result);
          },
          onSelection: (feedback : any) => {             // Action script onSelection event | (Optional)
              this.onSelection(feedback);
              inputField.value = feedback.selection.value.title;
          }

      })

    }
    if (event.fromState == 'openSearch') {
      this.autoCompleteElement.placeholder = '';
      this.searchIsDone = true;
    }
  }

}
