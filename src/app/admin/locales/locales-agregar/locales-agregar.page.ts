import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Local } from '../../interface-admin/local';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-locales-agregar',
  templateUrl: './locales-agregar.page.html',
  styleUrls: ['./locales-agregar.page.scss'],
})
export class LocalesAgregarPage implements OnInit {

  localform!: FormGroup;
  submitted = false;
  loading = false;
  public imgcargando = false;
  public img64 = '';
  local: Local = {
    id: '',
    nombre: '',
    direccion: '',
    comuna: '',
    region: '',
    telefono: '',
    img: ''
  };

  id: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private firestore: LocalService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private aroute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.localform = this.formBuilder.group({
      nombre: ['', Validators.required],
      direccion: ['',Validators.required],
      comuna: ['',Validators.required],
      region: ['',Validators.required],
      telefono: ['',Validators.required],
      img: ['',Validators.required]
    });
    this.id = this.aroute.snapshot.paramMap.get('id');
  }

  public cfoto(evento: Event){
    this.imgcargando = true;
    const elemento = evento.target as HTMLInputElement;
    const img = elemento.files?.[0];
    console.log(img);
    if (img) {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        this.imgcargando = false;
        this.img64 = reader.result as string;
      }
    }
  }

  agregarlocal() {

    const local: any = {
      nombre: this.localform.value.nombre,
      direccion: this.localform.value.direccion,
      comuna: this.localform.value.comuna,
      region: this.localform.value.region,
      telefono: this.localform.value.telefono,
      img: this.img64
    };

    this.firestore.agregarlocal(local).then(() => {
      this.loading = false;
      console.log(local);
      this.router.navigate(['/admin/locales']);
    });
  }

}
