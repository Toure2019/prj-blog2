import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      loveIts: 0
    });
  }

  onSavePost(title: string, content: string, loveIts: number){
    const formValue = this.postForm.value;
    title = formValue['title'];
    content = formValue['content']; 
    loveIts = formValue['loveIts'];

    this.postService.addPost(title, content, loveIts);
    this.router.navigate(['/posts']);
  }

}
