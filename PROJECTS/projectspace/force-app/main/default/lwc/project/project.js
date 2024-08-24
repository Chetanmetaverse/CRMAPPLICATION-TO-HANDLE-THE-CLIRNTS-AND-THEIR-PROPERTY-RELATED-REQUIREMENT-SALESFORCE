import { LightningElement, api, track, wire } from 'lwc';

import getProperty from "@salesforce/apex/PropertHandler_LWC.getProperty"

import { getRecord } from 'lightning/uiRecordApi';

import USER_ID from '@salesforce/user/Id';

export default class C_01_Property_Management extends LightningElement {

     @api recordId

     userId = USER_ID;

     verifiedvar

     typevar

     isfalse = true;

     istrue = false;

     @track propertylist = [];

     columns = [

          { label: 'Property Name', fieldName: 'Property_Name__c' },

          { label: 'Property Type', fieldName: 'Type__c' },

          { label: 'Property Location', fieldName: 'Location__c' },

          { label: "Property link", fieldName: "Property_link__c" }

     ]

     propetyoptions = [

          { label: "Commercial", value: "Commercial" },

          { label: "Residential", value: "Residential" },

          { label: "rental", value: "rental" }


     ]

     @wire(getRecord, { recordId: "$userId", fields: ['User.Verified__c'] })

     recordFunction({ data, error }) {

          if (data) {

               console.log(data)

               console.log("This is the User Id ---> " + this.userId);

               this.verifiedvar = data.fields.Verified__c.value;

          } else {

               console.error(error)

               console.log('this is error')

          }

     }


     changehandler(event) {

          console.log(event.target.value);

          this.typevar = event.target.value;

     }

     handleClick() {


          getProperty({ type: this.typevar, verified: this.verifiedvar })

               .then((result) => {

                    this.isfalse = true;

                    console.log(result)

                    console.log('This is the User id ---> ' + this.userId);

                    console.log('This is the verified values ---> ' + this.verifiedvar);

                    if (result != null && result.length != 0) {

                         this.istrue = true;

                         this.propertylist = result;

                         console.log(this.verifiedvar);

                         console.log(this.typevar)

                    } else {

                         this.isfalse = false;

                         this.istrue = false;

                    }


               })

               .catch((error) => {

                    console.log(error)

               })

     }



}

