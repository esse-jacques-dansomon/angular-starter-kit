import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialShareService {

  constructor() { }
 //share on whatsapp with text and numero
   shareOnWhatsapp(text: string) {
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
   }

   //share on Facebook with text
   shareOnFacebook(text: string, url: string) {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
   }

   shareOnTwitter(text: string, url: string) {
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
   }

   shareOnLinkedin(text: string, url: string) {
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}`, '_blank');
   }

   shareOnPinterest(text: string, url: string) {
      window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${text}`, '_blank');
   }

   //share telephonique
   shareOnPhone(numero: string) {
      window.open(`tel:${numero}`, '_blank');
   }

   //share on email
   shareOnEmail(email: string, subject: string, body: string) {
      window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
   }

   writeOnWhatsapp(numero: string) {
      window.open(`https://api.whatsapp.com/send?phone=${numero}`, '_blank');
   }

   writeOnWhatsappText(numero: string, text: string) {
      window.open(`https://api.whatsapp.com/send?phone=${numero}&text=${text}`, '_blank');
   }

   callOnPhone(numero: string) {
      window.open(`tel:${numero}`, '_blank');
   }

   openLocationWithAddress(address: string) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
   }

   copyLink(href: string) {
      const el = document.createElement('textarea');
      el.value = href;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
   }

   copyToClipboard(text: string) {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);


   }
}
