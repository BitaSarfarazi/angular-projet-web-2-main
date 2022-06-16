import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { IProduit } from '../iproduit';
import { ApibieroService } from '../Serv/apibiero.service';

@Component({
    selector: 'app-entete',
    templateUrl: './entete.component.html',
    styleUrls: ['./entete.component.scss']
})
    
export class EnteteComponent implements OnInit {
    estConnecte!:boolean;
    sTitre!:string;
    bouteille!:IProduit;

    constructor(private authServ:AuthService, private bieroServ:ApibieroService, public dialog: MatDialog) {
        
    }

    ngOnInit(): void {

        this.authServ.statut().subscribe(bLogin=>{
        this.estConnecte = bLogin;
        })
        this.authServ.getTitre().subscribe(leTitre =>{
        this.sTitre = leTitre;
        })
    }

}
