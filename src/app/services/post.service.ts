import { Injectable } from '@angular/core';
import { Post } from '../post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postSubject = new Subject<Post[]>();
  
  private posts: Post[] = [
    /*
    new Post(
      '1er Post',
      'Au début de l’année 2010, un employé de Google dont le nom est Misko Hevery travaillait sur un projet à part dont le but est de faciliter le développement des applications web pour plusieurs projets internes qu’il concevait. Ce projet fut nommé Angular JS.', 
    3), 
    new Post(
      '2ème Post',
      'Adam abrons ami de Misko et qui travaillait avec lui sur ce projet choisit le nom d’Angular car les balises du langage HTML sont écrites entre des chevrons angulaires (angular brackets < >).Ils ont alors enregistré le nom de domaine getangular.com (vu que angular.com était déjà prit)', 
    0),
    new Post(
      '3ème Post',
      'Plusieurs Années plus tard, l’environnement JavaScript évolue et de nouveaux standards apparaissent. L’équipe d’AngularJS font de leur mieux pour améliorer le Framework à chaque Pull Request mais finissent être bloqués par ses capacités restreintes. Le Framework jusqu’à ce temps a gardé sa version 1.x.x malgré les évolutions majeures et mineures qui lui sont apportées.', 
    -2), 
    new Post(
      '4ème Post',
      'Plusieurs Années plus tard, l’environnement JavaScript évolue et de nouveaux standards apparaissent. L’équipe d’AngularJS font de leur mieux pour améliorer le Framework à chaque Pull Request mais finissent être bloqués par ses capacités restreintes. Le Framework jusqu’à ce temps a gardé sa version 1.x.x malgré les évolutions majeures et mineures qui lui sont apportées.', 
    11), 
    new Post(
      '5ème Post',
      'Plusieurs Années plus tard, l’environnement JavaScript évolue et de nouveaux standards apparaissent. L’équipe d’AngularJS font de leur mieux pour améliorer le Framework à chaque Pull Request mais finissent être bloqués par ses capacités restreintes. Le Framework jusqu’à ce temps a gardé sa version 1.x.x malgré les évolutions majeures et mineures qui lui sont apportées.', 
    -21) */
  ];

  constructor(private httpClient: HttpClient) { } 

  emitPostSubject(){
    this.postSubject.next(this.posts.slice());
  }

  addPost(title: string, content: string, loveIts: number){
    const postObj = new Post('', '', 0);

    // postObj.id = this.posts[(this.posts.length - 1)].id + 1;  // Récuperer dernier "ID" et l'incrémenter
    postObj.title = title;
    postObj.content = content;
    postObj.loveIts = loveIts;
    postObj.created_at = new Date();    
    
    this.posts.push(postObj);
    this.emitPostSubject(); 

    this.savePostToServer();
  }

  deletePost(index: number){
    this.posts.splice(index, 1); 
    this.emitPostSubject();
  }

  savePostToServer(){
    this.httpClient.put('https://prj-blog.firebaseio.com/posts.json', this.posts).subscribe(
        () => {
          console.log(' Enregistrement effectué avec succès !');
        }, 
        (error) => {
          console.log(' Une erreur est survenue : ' + error);
        }
      );
  }

  getPostFromServer(){
    this.httpClient.get<any[]>('https://prj-blog.firebaseio.com/posts.json').subscribe(
      (result) => {
        this.posts = result;
        this.emitPostSubject();
      }, 
      (error) => {
        console.log(' Une erreur est survenue : ' + error);
      },
      () => {
        console.log(' Chargement de la liste effectuée !');
      }
    );
  }

}
