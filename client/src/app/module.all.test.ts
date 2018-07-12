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
} from "../../node_modules/@angular/platform-browser";
import {
  FormsModule
} from "../../node_modules/@angular/forms";
import {
  HttpClientModule
} from "../../node_modules/@angular/common/http";
import {
  StoreModule
} from "../../node_modules/@ngrx/store";
import {
  reducer_total
} from "./store/reducers/index.reducer";
import {
  JwtModule
} from "../../node_modules/@auth0/angular-jwt";
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
