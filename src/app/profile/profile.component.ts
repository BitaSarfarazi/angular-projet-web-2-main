import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsagerService} from "../Serv/usager.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  usagerForm:FormGroup;
  passwordFormGroup:FormGroup;
  villes = [
    {
      id: 1,
      nom: 'Montréal'
    },
    {
      id: 2,
      nom: 'Laval'
    },
    {
      id: 3,
      nom: 'Boucherville'
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private usagerService: UsagerService
  ) { }

  /** Modèles d'expression régulière */
  ngOnInit(): void {
    this.getUsager();
    /** Forme et validation des données saisies */
    this.usagerForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      nom: [null, [Validators.required]],
      courriel: [null, [Validators.required]],
      phone: [null, []],
      adresse: [null, []],
      id_ville: [null, [Validators.required]],
    })

      this.passwordFormGroup = this.formBuilder.group({
        password: [null, [Validators.required, Validators.minLength(6)]],
        confirm_password: [null, [Validators.required, Validators.minLength(6)]],
      }, {validator: this.passwordConfirming});
  }

  // @ts-ignore
  passwordConfirming(c: AbstractControl): { passwordMismatch: boolean } {
    // @ts-ignore
    if (c.get('password').value !== c.get('confirm_password').value && c.get('confirm_password').value !== null) {
      console.log('passwordMismatch');
      return {passwordMismatch: true};
    }
  }

  async submit(){
    try{
        const res = await this.usagerService.modifierUsager(this.usagerForm.value).toPromise();
    }catch (e){

    }finally {

    }
  }

  async getUsager(){
    try{
      //todo get id de l'usager connnecté au lieu de 1
      const id_usager = 1;
      const res = await this.usagerService.getUsager(id_usager).toPromise();
      this.usagerForm.patchValue({
        ...res
      });
    }catch (e){

    }finally {
    }
  }


}
