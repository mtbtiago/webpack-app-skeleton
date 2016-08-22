import $ from "jquery";
import {blgegh} from "shared/test";
import "./application.scss";

blgegh();

$("body").html("the new blegh is here");

if (module.hot) {
  module.hot.accept();
}
