import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list-view',
  templateUrl: './post-list-view.component.html',
  styleUrls: ['./post-list-view.component.css']
})
export class PostListViewComponent implements OnInit, OnDestroy {

  constructor(private postService: PostService){}

  posts: Post[];
  postSubscription: Subscription;


  ngOnInit(){
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPostSubject();
  }

  ngOnDestroy(){
    this.postSubscription.unsubscribe();
  }

}
