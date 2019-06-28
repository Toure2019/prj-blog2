import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostListViewComponent } from './post-list-view/post-list-view.component';

const routes: Routes = [
  { path: 'posts', component: PostListViewComponent }, 
  { path: 'new', component: NewPostComponent }, 
  { path: '',  component: PostListViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
