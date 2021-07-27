import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { interval, Subscription } from 'rxjs';
declare var $: any;
import { NavController, Platform, AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-digitalwallet',
  templateUrl: './digitalwallet.component.html',
  styleUrls: ['./digitalwallet.component.css']
})
export class DigitalwalletComponent implements OnInit {

  open_back:boolean = false;
  nfcReading = false;
  readerModeSub: Subscription;
  intervalSub: Subscription;
  discoveredListenerSub: Subscription;
  nfcTag = '';
  tagid: any;
tagdesc: any; 
  private cd: ChangeDetectorRef
  constructor(private nfc: NFC, private ndef: Ndef,private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    ) { }
   
  ngOnInit(): void {
   
 
  }
  front_side()
  {
    $(".v_card").show()
    $(".front_side").hide()
  }
  back_side()
  {
  
    $(".v_card").hide()
    $(".front_side").show()
    $(".front_side").flip(true);
  }


  startNFC() {
    console.log("startNFC");
    this.nfcReading = true;
    let flags = this.nfc.FLAG_READER_NFC_A | this.nfc.FLAG_READER_NFC_V;

    this.readerModeSub = this.nfc.readerMode(flags).subscribe(
      tag => {
        console.log(JSON.stringify(tag));
        this.nfcTag = this.nfc.bytesToHexString(tag.id);
        this.nfcReading = false;
        this.cd.detectChanges();
        this.readerModeSub.unsubscribe();

      },
      err => {
        console.log("Error reading tag", err);
        this.nfcReading = false;
      }
    );
  }
  startNFCListener() {
    this.nfcReading = true;

    this.discoveredListenerSub = this.nfc.addTagDiscoveredListener(() => {
      console.log('successfully attached addTagDiscoveredListener listener');
    }, (err) => {
      console.log('error attaching addTagDiscoveredListener listener', err);
    }).subscribe((event) => {
      console.log('received addTagDiscoveredListener message. the tag contains: ', event.tag);
      const tag = this.nfc.bytesToHexString(event.tag.id);
      this.cd.detectChanges();
      console.log( this.cd.detectChanges()+'decoded tag id', tag);
      this.nfcTag = tag;
      this.nfcReading = false;
      this.discoveredListenerSub.unsubscribe();
    });
  }

  doNothing() {

    this.addListenNFC();
    // this really does nothing... it is just to demonstrate that this triggers the changedetection
  }

  startInterval() {
    this.nfcReading = true;
    this.intervalSub = interval(2000).subscribe((_) => {
      this.nfcTag = 'interval Tag';
      this.nfcReading = false;
      this.intervalSub.unsubscribe();
    });
  }

  addListenNFC() {
    console.log('enter into a addListenNFC');
    this.tagid;
    this.tagdesc;
    
      this.nfc.addNdefListener(() => {
        console.log('successfully attached ndef listener');
      }, async (err) => {
        console.log('error attaching ndef listener', err);
    
        let toast = this.toastCtrl.create({
          message: err,
          duration: 1000,
          position: 'bottom'
        });
    
        return (await toast).present(); 
    
      }).subscribe(async (event) => {
        console.log('received ndef message. the tag contains: ', event.tag);
        console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
        this.tagid = "";
        this.tagdesc = "";
        let tagId = await this.nfc.bytesToHexString(event.tag.id);
        this.tagid = tagId;
        if (event.tag.ndefMessage) {
        let payload = event.tag.ndefMessage[0].payload;
         let tagContent = await this.nfc.bytesToString(payload).substring(3);
         this.tagdesc = tagContent;
        }
    
        let toast = this.toastCtrl.create({
          message: this.nfc.bytesToHexString(event.tag.id),
          //message: this.nfc.bytesToHexString(event.tag.ndefMessage[0].payload) && " --- " && this.nfc.bytesToHexString(event.tag.id) ,
          duration: 5000,
          position: 'bottom'
        });
        (await toast).present(); 
        this.cd.detectChanges();
      });
    
    }
    
}
