import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../shared/services/book/book.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {
  public bookForm!: FormGroup;
  private readonly unsubscribe$ = new Subject<void>();
  onAdd = new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private Ref: MatDialogRef<ModalpopupComponent>, private fb: FormBuilder, private bookService: BookService,
  ) { }

  ngOnInit(): void {
    this.initBookForm();
  }
  initBookForm(): void{

    this.bookForm = this.fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      pageCount: ['',Validators.required],
      publicDate: [new Date(),Validators.required]
    })
  }
  Closepopup() {
    this.Ref.close("Closing from function");
  }
  createBook(){
    const newBook ={
      name: this.bookForm.value.name,
      publicDate: this.bookForm.value.publicDate.toISOString(),
      pageCount: this.bookForm.value.pageCount,
      description: this.bookForm.value.description,
    }
    this.bookService.create(newBook).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
        this.initBookForm();
        this.onAdd.emit();
      },
      error => {
        console.log(error)
      })
    this.bookForm.reset();
  }
  // updatebook(): void{
  //   if(this.title && this.body){
  //     const newArticle ={
  //       Id: this.articleId,
  //       title: this.articleForm.value.title,
  //       body: this.articleForm.value.body,
  //       image: this.articleForm.value.image,
  //       IsApproved:this.isApproved,
  //       CreatedBy: this.user?.Username
  //     }
  //     this.bookService.update(newArticle,this.articleId).pipe(takeUntil(this.unsubscribe$)).subscribe(
  //
  //       () => {
  //         this.initArticleForm();
  //         this.loadbook();
  //       },
  //       error => {
  //         console.log(error)
  //       });
  //
  //     this.title = '';
  //     this.body='';
  //     this.isEdit = false;
  //     this.articleId!=null;
  //   }
  //
  // }

}
