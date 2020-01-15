import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { MongoImageModel } from '../models/mongoImage.model';

@Directive({ selector: '[appEditor]' })

export class AppEditorDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ){}

    @Input() set appEditor(condition: any[]){

        if(condition && condition.length > 0) {
          this.viewContainer.createEmbeddedView(this.templateRef);
          initialiseDragElement(document.getElementById('image-editor'));

        } else {
          this.viewContainer.clear();
        }


      function initialiseDragElement(elmnt: any) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        let dragArea = document.getElementById('drag-area');
        dragArea.onmousedown = dragStart;

        function dragStart(e: any) {
          e = e || window.event;
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          dragArea.onmousemove = dragProgress;
          dragArea.onmouseup = dragEnd;
        }

        function dragProgress(e: any) {
          e = e || window.event;
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function dragEnd(e: any) {
          dragArea.onmouseup = null;
          dragArea.onmousemove = null;
        }
      }

    }

}
