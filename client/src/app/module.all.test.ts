import {
  AppComponent
} from "./app.component";
import {
  ForRoomShowComponent
} from "./components/for-room-show/for-room-show.component";
import {
  AppComponentRoute,
  AppRoutingModule
} from "./app-routing.module";
import {
  ErrComponentComponent
} from "./components/err-component/err-component.component";
import {
  BrowserModule
} from "@angular/platform-browser";
import {
  FormsModule
} from "@angular/forms";
import {
  HttpClientModule
} from "@angular/common/http";
import {
  StoreModule
} from "@ngrx/store";
import {
  reducer_total
} from "./store/reducers/index.reducer";
import {
  JwtModule
} from "@auth0/angular-jwt";
import {
  tokenGetter
} from "./app.module";

export const declarations = [
  AppComponent,
  ForRoomShowComponent,
  ErrComponentComponent,
  ...AppComponentRoute

]

export const imports = [
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  HttpClientModule,
  StoreModule.forRoot(reducer_total),
  JwtModule.forRoot({
    config: {
      tokenGetter: tokenGetter,
      headerName: 'SukumJsonWebToken _1235'
    }
  })
]
