import {BehaviorSubject, Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

interface Product{
  id: number;
}

@Injectable({
   providedIn: 'root'
})
export class WishlistService {

   private  products : BehaviorSubject<Product[]> =  new BehaviorSubject<Product[]>([]);

   constructor(private toatService: ToastrService)
   {
      this.setWishlist(this.getWishlistFromLocalStorage());
   }

   public getWishlistProducts() : Observable<Product[]> {
      return this.products.asObservable();
   }

   public addToWishlist(product : Product) {
      let wishlist = this.getWishlistFromLocalStorage();
      //not in wishlist
      if(wishlist.findIndex(p => p.id === product.id) === -1) {
         wishlist.push(product);
         localStorage.setItem('wishlist', JSON.stringify(wishlist));
         this.setWishlist(wishlist);
         this.toatService.success('Produit ajouté à la liste de souhaits');
      }

   }

   public removeFromWishlist(product : Product) {
      let wishlist = this.getWishlistFromLocalStorage();
      wishlist = wishlist.filter((p) => p.id != product.id);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      this.setWishlist(wishlist);
      this.toatService.success('Produit supprimé de la liste de souhaits');
   }

   public isProductInWishlist(product : Product) : boolean {
      let wishlist = this.getWishlistFromLocalStorage();
      return wishlist.some((p) => p.id == product.id);
   }

   wishlistCount$ : Observable<number> = of(this.getWishlistFromLocalStorage().length);


   public clearWishlist() {
      localStorage.removeItem('wishlist');
   }

   private setWishlist(products : Product[]) {
      this.products.next(products);
   }

   private getWishlistFromLocalStorage() : Product[] {
      return localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
   }

}
