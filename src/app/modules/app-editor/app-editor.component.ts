import { Component, OnInit, ViewEncapsulation, HostListener } from "@angular/core";
import { state, style, animate, transition, trigger, AnimationEvent } from "@angular/animations";
import { AppEditorServices } from "../../services/app-editor.services";

@Component({
  selector: 'app-editor',
  template: require('./app-editor.component.pug'),
  styleUrls: ['./app-editor.component.scss'],
})

export class AppEditorComponent implements OnInit {
    
  constructor(
    private editor: AppEditorServices
  ){}

  @HostListener('click', ['$event']) onClickHandler(event: MouseEvent) {
  }

  ngOnInit(): void {}

}
