export interface LoginResponse{

   etat ?: boolean;
   canAddProduct?: boolean;
   isExclusive?: boolean;
   plan ?:string;
   profil_image?: string;
   boutique_name?: string;
   vendeur_id?: number;
   boutique_id?: number;
   adresse ?:string;
   access_token :string;
   token_type ?:string;
   expires_in :number;

}
