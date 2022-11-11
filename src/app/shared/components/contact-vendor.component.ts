import { Component, Input } from '@angular/core';
import {Product} from "../../data/types/Product";

@Component({
   selector: 'app-contact-vendor',
   template: `
      <!-- Button trigger modal -->

      <!-- Modal -->
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
         <div class="modal-dialog">
            <div class="modal-content">
               <div class="modal-body">
                  <h5>Popover in a modal</h5>
                  <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-bs-content="Popover body content is set in this attribute.">button</a> triggers a popover on click.</p>
                  <hr>
                  <h5>Tooltips in a modal</h5>
                  <p><a href="#" class="tooltip-test" title="Tooltip">This link</a> and <a href="#" class="tooltip-test" title="Tooltip">that link</a> have tooltips on hover.</p>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">x</button>
               </div>
            </div>
         </div>
      </div>

  `,
})
export class ContactVendorComponent {

}
