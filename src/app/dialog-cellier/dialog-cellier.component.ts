import {Component, Inject, OnInit, Input, AfterViewInit} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApibieroService } from '../Serv/apibiero.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IProduit } from '../iproduit';

@Component({
    selector: 'app-dialog-cellier',
    templateUrl: './dialog-cellier.component.html',
    styleUrls: ['./dialog-cellier.component.scss']
})

export class DialogCellierComponent implements OnInit, AfterViewInit {
      id_cellier: any;
      title: any;
    creerCellierForm!:FormGroup;
    celliers: any;

    constructor(
                    private formBuilder: FormBuilder,
                    public dialogRef: MatDialogRef<DialogCellierComponent>,
                    @Inject(MAT_DIALOG_DATA) data: any,
                    private bieroServ: ApibieroService
                ) {
      this.id_cellier = data.id_cellier;
    }

    /** Modèles d'expression régulière */
    ngOnInit(): void {
        /** Forme et validation des données saisies */
        this.creerCellierForm = this.formBuilder.group({
            id: [null, [Validators.required]],
            nom: ['', [Validators.required]],
            adresse: ['', [Validators.required]],
            id_usager: [1, [Validators.required]]
        })
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    async submit(){
      try{
        if(!this.creerCellierForm.value?.id){
          const res = await this.bieroServ.ajouterCellier(this.creerCellierForm.value).toPromise();
        }else{
          const res = await this.bieroServ.modifierCellier(this.creerCellierForm.value).toPromise();
        }
      }catch (e){

      }finally {
        this.dialogRef.close('add');
      }
    }

    async getCellier(){
      try{
        const res = await this.bieroServ.getCellierById(this.id_cellier).toPromise();
        this.creerCellierForm.patchValue({
          ...res
        });
      }catch (e){

      }finally {
        this.dialogRef.close('add');
      }
    }

  ngAfterViewInit(): void {
      if(this.id_cellier){
        // Le cas de la modification
        // this.getCellier();
      }
  }
}
