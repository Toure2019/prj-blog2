import { Component, Input } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent {

  @Input() indexOfPost: number;
  @Input() id: string;
  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date; 

  constructor(private postService: PostService){ }

  onLoveIt(){
    this.loveIts += 1;
  }

  onDontLoveIt(){
    this.loveIts -= 1;
  }

  onDeletePost(){
    this.postService.deletePost(this.indexOfPost); 
    this.postService.emitPostSubject();
  }

}
