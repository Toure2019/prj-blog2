import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  @Input() posts: any[]; 

  constructor(private postService: PostService){}

  ngOnInit(){
    //this.postService.getPostFromServer();
  }

  onSavePosteToServer(){
    this.postService.savePostToServer();
  }

  onGetPostsToServer(){
    this.postService.getPostFromServer();
  }

}
