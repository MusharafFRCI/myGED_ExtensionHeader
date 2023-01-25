import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
    BaseApplicationCustomizer,
    PlaceholderContent,
    PlaceholderName
} from '@microsoft/sp-application-base';

import * as strings from 'HeaderAppApplicationCustomizerStrings';

import styles from './HeaderAppApplicationCustomizer.module.scss';
import * as $ from 'jquery';

require("./Styles/global.css")
require("./Styles/basic.css")
require("./Styles/HideSharepoint.css")
require("./Styles/media.css")


const LOG_SOURCE: string = 'HeaderAppApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderAppApplicationCustomizerProperties {
    // This is an example; replace with your own property
    Top: string;
    Bottom: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderAppApplicationCustomizer
    extends BaseApplicationCustomizer<IHeaderAppApplicationCustomizerProperties> {

    private _topPlaceholderHeader: PlaceholderContent | undefined;
    private _bottomPlaceholderFooter: PlaceholderContent | undefined;

    @override
    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);

        //Added the below line code to handle the possible changes on the existence of placeholders.  
        this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHoldersHeaderandFooter);

        //The below code is used to call render method for generating the HTML elements.  
        this._renderPlaceHoldersHeaderandFooter();

        return Promise.resolve();
    }

    private language = navigator.language;

    private _renderPlaceHoldersHeaderandFooter(): void {
        
        //console.log('HeaderAppApplicationCustomizer._renderPlaceHoldersHeaderandFooter()');
        //console.log('Available placeholders are as below: ',
            //this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

        //Handling the top placeholder - header section
        if (!this._topPlaceholderHeader) {
            this._topPlaceholderHeader =
                this.context.placeholderProvider.tryCreateContent(
                    PlaceholderName.Top,
                    {
                        onDispose: this._onDispose
                    });

            //The extension should not assume that the expected placeholder is available.  
            if (!this._topPlaceholderHeader) {
                console.error('The expected placeholder (top heder) was not found.');
                return;
            }

            if (this.properties) {
                let topString: string = this.properties.Top;
                if (!topString) {
                    topString = '(The top header property was not defined.)';
                }

                if (this._topPlaceholderHeader.domElement) {
                    this._topPlaceholderHeader.domElement.innerHTML = `  
          <header>
            <div class="inner-top-header w100 cnt-95 flex-basic flex-align-center flex-justify-between h100">
                <div class="left-header w25">
                    <div class="inner-left-header w100">
                        <a href="https://ncaircalin.sharepoint.com/sites/TestMyGed/SitePages/Page-D'accueil.aspx">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 348.822 73.282">
                                <defs>
                                  <clipPath id="clip-path">
                                    <rect id="Rectangle_365" data-name="Rectangle 365" width="348.822" height="73.282" transform="translate(0 0)" fill="none"/>
                                  </clipPath>
                                </defs>
                                <g id="Logo" transform="translate(0 0)">
                                  <g id="Group_699" data-name="Group 699" clip-path="url(#clip-path)">
                                    <path id="Path_436" data-name="Path 436" d="M73.328,33.2l.139-.046h.623q.278,0,.81-.647a12.182,12.182,0,0,1,1.232-.439l.093-.092a5.486,5.486,0,0,1,.465-.37h.441a1.638,1.638,0,0,0,.372-.22,5.311,5.311,0,0,1,1.377-.5,6.915,6.915,0,0,0,1.376-.462,8.455,8.455,0,0,1,1.016-.139l.647-.116.508.047q1.224,0,1.756,1.617a.665.665,0,0,0,.116.288.682.682,0,0,1,.115.29,3.141,3.141,0,0,1-.947,2.033l-.324.854a1.38,1.38,0,0,1-.242.347,3.28,3.28,0,0,0-.428.7,5.163,5.163,0,0,1-.993,1.213q-.138.278-.393.867a2.982,2.982,0,0,1-.427.774,13.5,13.5,0,0,0-.9,1.386A5.663,5.663,0,0,0,79.031,42a1.359,1.359,0,0,0-.473.855,3.313,3.313,0,0,1-.474,1.132l-.046.162q.738-.255.739-.809c0-.046.13-.162.392-.346l.184-.324a1.037,1.037,0,0,1,.485-.37,1.415,1.415,0,0,1,.484-.543c.293-.238.489-.4.589-.5a1.8,1.8,0,0,1,.5-.289q.347-.15.785-1.143c.03-.123.15-.224.358-.3a1.166,1.166,0,0,0,.519-.381,1.7,1.7,0,0,1,.346-.358l.184-.277a2.165,2.165,0,0,1,.347-.278l1.13-1.386q.9-.577.993-.9l.184-.046h.138c.247-.2.408-.339.485-.416a.885.885,0,0,1,.519-.912,1.766,1.766,0,0,0,.75-.532.643.643,0,0,1,.508-.312.583.583,0,0,1,.254.139h.046c.046,0,.093-.077.139-.231v-.231a.93.93,0,0,1,.23-.647,1.124,1.124,0,0,1,.624-.335,1.34,1.34,0,0,0,.761-.589,1.117,1.117,0,0,1,.842-.531.671.671,0,0,0,.635-.37,2.1,2.1,0,0,1,.992-.751,5.91,5.91,0,0,1,1.038-.439,1.214,1.214,0,0,0,.381-.127.76.76,0,0,1,.358-.092,2.413,2.413,0,0,1,.669.139l.416.092a2.546,2.546,0,0,1,.994.854l.231.232v.092l.046.393v.185c.2.092.3.184.3.277l-.162.3a.762.762,0,0,0-.092.381,4.288,4.288,0,0,1-.023.439c-.015.147-.034.285-.058.416a2.668,2.668,0,0,1-.092.37,3.346,3.346,0,0,1-.127.323,2.155,2.155,0,0,1-.162.289l-.185.739a3.228,3.228,0,0,1-.5,1.052,3.918,3.918,0,0,0-.474.854,2.955,2.955,0,0,1-.323.659l.046.138v.324c.479-.062.719-.246.719-.555a.767.767,0,0,1,.58-.716l.51-.416A2.905,2.905,0,0,1,98.754,35a1.075,1.075,0,0,1,.441-.762l.881-.832.626-.346a1.878,1.878,0,0,1,.952-1.04l.51-.324c.309-.154.483-.3.521-.45a.923.923,0,0,1,.36-.451q.3-.229.881-.762l.185-.093.231-.231a2.855,2.855,0,0,1,.578-.231l.185-.092a3.658,3.658,0,0,1,1.039-.589,5.191,5.191,0,0,0,1.04-.5l.808-.115a1.514,1.514,0,0,1,.37-.093q2.194,0,2.195,2.472l-.047.37.047,1.34a11.254,11.254,0,0,0-.578.994l.047.415a1.88,1.88,0,0,1-.3.543c-.2.3-.32.481-.358.543a5.194,5.194,0,0,1-.427.485l-.231.693a1.289,1.289,0,0,1-.393.439v.278q0,.345-.9,1.039a1.676,1.676,0,0,1-.4.889,2.228,2.228,0,0,0-.438.6,1.835,1.835,0,0,1-.474.589,2.61,2.61,0,0,1-.393,1.017,3.924,3.924,0,0,1-.612.912,2.2,2.2,0,0,0-.45.682l-.208.092c-.093.586-.2.917-.324.993l-.37-.045v.092a.347.347,0,0,0,.093.161.4.4,0,0,1,.092.255.348.348,0,0,1-.139.277.427.427,0,0,0-.162.231.607.607,0,0,1-.1.231.981.981,0,0,0-.105.45,2.388,2.388,0,0,1-.347.913,2.764,2.764,0,0,0-.348.786,1.756,1.756,0,0,1-.069.346.844.844,0,0,0-.047.277,5.212,5.212,0,0,1-.116.716q.441,1.041.626,1.41a1.5,1.5,0,0,1,.186.485,2.258,2.258,0,0,1-.232,1.236q-.232.312-1.136.312a1.421,1.421,0,0,1-1.008-.4,1.2,1.2,0,0,0-.753-.4v-.416l-.046-.046h-.37c-.031-.03-.1-.084-.2-.161a1.312,1.312,0,0,1-.289-.324l-.139-.139a2.1,2.1,0,0,1-.323-.762l-.139-.462.047-.37-.047-.577a1.168,1.168,0,0,1,.047-.37l.045-.624a1.925,1.925,0,0,1,.093-.4,3.25,3.25,0,0,0,.115-.739,1.141,1.141,0,0,1,.208-.659.88.88,0,0,0,.208-.393.46.46,0,0,1,.127-.265,1.088,1.088,0,0,0,.174-.52.958.958,0,0,1,.485-.67q.231-.416.393-.785a7.11,7.11,0,0,1,.508-.67h.323a1.235,1.235,0,0,1-.231-.324q0-.624.486-.624a.765.765,0,0,1,.231.047l.092-.185-.092-.393c0-.261.2-.523.6-.785a1.558,1.558,0,0,1,.624-1.2l-.046-.369a3.026,3.026,0,0,0,.392-.613,6.266,6.266,0,0,1,.647-.959l.717-1.085.323-.37c0,.016,0,.019.012.012a.484.484,0,0,0,.046-.093,2.37,2.37,0,0,0,.081-.242l.138-.347.162-.185q.6-.16.6-.416a1.113,1.113,0,0,0-.184-.3v-.092a.754.754,0,0,1,.277-.462,2.881,2.881,0,0,0,.52-.774,2.286,2.286,0,0,0,.242-.612.082.082,0,0,0-.092-.093.993.993,0,0,0-.994.532q0,.138-.9.554l-.231.347a.783.783,0,0,1-.486.253.99.99,0,0,0-.543.266q-.334.266-1.466,1.2a15.383,15.383,0,0,0-1.664,1.536l-.531.369c-.217.108-.325.193-.325.255q0,.231-.394.6l-.278.347a2.386,2.386,0,0,0-.371-.116.537.537,0,0,0-.44.254c.123.124.185.2.185.232q0,.369-.7.762l-1,1.04a4.183,4.183,0,0,1-.348.254,1.315,1.315,0,0,0-.452.519,6.427,6.427,0,0,1-.823,1.086,6.173,6.173,0,0,1-.788.832.891.891,0,0,0-.278.312,4.227,4.227,0,0,1-.672.716,1.65,1.65,0,0,0-.58,1.017q-.441.162-.441.277l-.138.231-.186.092a.98.98,0,0,0-.069.312c-.016.147-.323.409-.924.786a3.48,3.48,0,0,1-1.132.566.445.445,0,0,0-.208.092.485.485,0,0,1-.185.093,3.341,3.341,0,0,1-.612-.278,1.858,1.858,0,0,1-.8-1.294l.186-.6-.093-.485a.639.639,0,0,1,.219-.37.8.8,0,0,0,.22-.577q.369-.833.554-1.179l.047-.369a2.273,2.273,0,0,1,.312-.52,1.339,1.339,0,0,0,.265-.647.492.492,0,0,1,.3-.45,14.471,14.471,0,0,0,1.871-2.8V36.71l.67-1.154q.3-.509.739-1.156l.208-.531c-.478-.185-.731-.277-.762-.277a.587.587,0,0,0-.347.184q0,.395-1.363.809a2.662,2.662,0,0,0-.715.67l-.647.37a4.185,4.185,0,0,0-.438.37l-.324.3a1.811,1.811,0,0,0-.992.646l-.623.439a2.937,2.937,0,0,0-.37.347,4.138,4.138,0,0,1-.855.508l-.369.37-.346.185a5.463,5.463,0,0,0-.555.67.7.7,0,0,1-.484.323l-.508.185a2.141,2.141,0,0,1-.854,1.155l-.67.832a3.284,3.284,0,0,1-.323.254.562.562,0,0,1-.324.324q-.3.369-.392.507l-.277.208q-.624.232-.624.37l.047.416q0,.255-.554.485a.462.462,0,0,0-.266.37,1.713,1.713,0,0,1-.173.531h-.416a1.68,1.68,0,0,0-.438.231.133.133,0,0,0-.093.047l.093.531a.979.979,0,0,1-.37.635,4.854,4.854,0,0,0-.566.635c-.13.186-.227.278-.288.278h-.139l-.138.092a1.267,1.267,0,0,1-.577.947l-.277.347a8.356,8.356,0,0,0-.788,1.155A12.343,12.343,0,0,1,74.344,52a3.408,3.408,0,0,1-1.063.867c-.323.147-.669.3-1.039.45l-.947-.184a1.105,1.105,0,0,0-.4-.416c-.177-.108-.265-.223-.265-.347l-.278-.809a1.767,1.767,0,0,1,.255-.8,3.116,3.116,0,0,0,.311-.74,3.843,3.843,0,0,1,.266-.716,3.229,3.229,0,0,0,.208-.5c0-.416.065-.673.2-.774l.889-.681c.031,0,.046-.031.046-.092v-.047l-.046-.392q.531-.9.67-.9a.737.737,0,0,1,.185.046l-.139-.509c0-.061.085-.161.254-.3a1.571,1.571,0,0,0,.393-.462l-.093-.277v-.093a1.242,1.242,0,0,1,.578-.9q.093-.184.37-.948l.6-1.063a1.461,1.461,0,0,1,.488-.589.5.5,0,0,0,.279-.357,1.272,1.272,0,0,1,.163-.463c0,.077.011.081.034.012s.063-.22.117-.451a.847.847,0,0,1,.523-.554q.534-1.364.836-1.363a.575.575,0,0,1,.256.092h.093c.246,0,.37-.092.37-.277a.083.083,0,0,0-.093-.093.557.557,0,0,1-.37.232c-.108,0-.163-.031-.163-.093,0-.03.023-.061.07-.092l.509-1.04.047-.439a3.186,3.186,0,0,1,.369-.416L79.216,35V34.77a2.973,2.973,0,0,1,.208-.474,3.812,3.812,0,0,0,.3-.843l.393-.578a1.629,1.629,0,0,0,.092-.508c0-.231-.031-.346-.092-.346l-1.34.254a14.341,14.341,0,0,0-1.553.878l-.534.116a4.423,4.423,0,0,0-.617.311,2.578,2.578,0,0,1-1,.347,1.218,1.218,0,0,0-.753.335l-.092.046H73.79a4.35,4.35,0,0,0-.347.45c-.061.1-.115.151-.162.151q-2.333,1.546-2.957,1.871a5.6,5.6,0,0,0-.947.589,3.188,3.188,0,0,1-.554.381v.277a1.328,1.328,0,0,1-.566.89,1.623,1.623,0,0,1-.982.5,1.081,1.081,0,0,1-.428-.15,1.927,1.927,0,0,0-.647-.2q-.357-.045-.358-.878,0-1.177,1.941-2.149a3.223,3.223,0,0,0,.555-.323,16.389,16.389,0,0,1,2.056-.9l.67-.323a2.128,2.128,0,0,1,.774-.428c.361-.13.647-.242.855-.335a3.414,3.414,0,0,1,.5-.185ZM95.009,38.79l.231-.416v-.046c0-.031-.031-.046-.092-.046q-.231,0-.37.462.046.138.093.138a.147.147,0,0,0,.138-.092" fill="#00b0ea"/>
                                    <path id="Path_437" data-name="Path 437" d="M125.379,46.968v.254l.046.185V47.5q0,.046-.092.531a1.637,1.637,0,0,0-.393,1.04l-.277.416a.626.626,0,0,1-.22.508,1.555,1.555,0,0,0-.381.739c-.107.37-.239.763-.393,1.179l-.531,1.316a.082.082,0,0,0,.092.093.436.436,0,0,0,.151-.046.483.483,0,0,1,.2-.047.409.409,0,0,1,.185.047.352.352,0,0,0,.139.046,1.471,1.471,0,0,0,.336-.162,1.814,1.814,0,0,1,.66-.208l.856-.208a4.43,4.43,0,0,1,1.135-.092l.718-.047a3.807,3.807,0,0,1,1.725.439,2.241,2.241,0,0,1,1.088.925,4.07,4.07,0,0,1,.221,1.571q0,.854-.579.854a1.6,1.6,0,0,1-.891-.438,2.264,2.264,0,0,1-.752-1.109q-.207-.671-.67-.67l-.578-.185-.324.092h-.093a1.52,1.52,0,0,1-.416-.138h-.069l-.694.184h-.949l-.439.231a4.573,4.573,0,0,1-.706.139,2.3,2.3,0,0,0-.682.185c-.2.092-.3.177-.3.254a1.535,1.535,0,0,1-.625,1.225,1.526,1.526,0,0,0-.254.588.914.914,0,0,1-.266.486,3.654,3.654,0,0,0-.521.82l-.185.323a.451.451,0,0,0-.093.231.756.756,0,0,0,.047.185V59a1.585,1.585,0,0,1-.764,1.224v.231c0,.123-.123.3-.37.532l.093.462c0,.061-.085.189-.255.381a2.9,2.9,0,0,0-.428.647,1.537,1.537,0,0,1-.658.635v.139l.139.277c.046,0,.069.031.069.092q0,.162-.347.486a2.258,2.258,0,0,1-.324.716l-.947,1.271a.989.989,0,0,0-.232.508l-.162.439a1.283,1.283,0,0,0-.358.427,6.178,6.178,0,0,1-.613.866q-.51.646-.67.647a1.464,1.464,0,0,1,.138.324,1.09,1.09,0,0,1-.37.67c-.4,0-.6.084-.6.254l.116.462c0,.061-.085.154-.255.277a.782.782,0,0,1-.416.185h-.324l.093.416a.585.585,0,0,1-.278.346,2.973,2.973,0,0,0-.612.543,2.963,2.963,0,0,1-.613.543l-.3.185-.9.093a8.4,8.4,0,0,1-1.422-.763q-1.051-.646-1.2-1.213a6.611,6.611,0,0,1-.15-1.605.83.83,0,0,1,.231-.393l.046-.185v-.439q0-.046.231-.82t.393-.855a2.366,2.366,0,0,0,.508-.912,6.235,6.235,0,0,1,.532-1.086l2.128-3.119a.577.577,0,0,1,.092-.393h.139a.264.264,0,0,0,.254-.127,1.756,1.756,0,0,1,.208-.289.836.836,0,0,1,.4-.716,1.712,1.712,0,0,0,.578-.612,3.418,3.418,0,0,1,.405-.612l.047-.139a1.326,1.326,0,0,1,.4-.219.52.52,0,0,0,.359-.358l.786-.763a2.6,2.6,0,0,1,.37-.231,1.779,1.779,0,0,0,.532-.508l.162-.07h.139l.093-.045c.184-.4.374-.617.566-.647a.746.746,0,0,0,.382-.139q-.024-.717.81-.716a.375.375,0,0,0,.277-.093l.555-.439a3.418,3.418,0,0,0,.439-.9v-.046l.417.116.046-.116-.092-.508a4.026,4.026,0,0,0,.277-.636c.139-.361.269-.573.393-.635s.185-.131.185-.208v-.277l-.047-.277.092-.185v-.3l.047-.093a2.43,2.43,0,0,0,.277-.855,1.184,1.184,0,0,1,.254-.184l1.04-2.934a4.65,4.65,0,0,0,.138-.6l.185-.254a3.812,3.812,0,0,0,.277-.947.082.082,0,0,0-.092-.093,1.1,1.1,0,0,0-.416.266.947.947,0,0,1-.485.265l-.37-.092h-.092a.669.669,0,0,0-.381.231c-.162.154-.258.231-.289.231l-.277.046q-.231.394-.416.439l-.578.37h-.047l-.323-.231c0-.031-.039-.046-.116-.046s-.154.185-.278.554l-.717.347a2.268,2.268,0,0,0-.278-.046q-.231,0-.44.427a.743.743,0,0,1-.556.474,1.576,1.576,0,0,1-.856.323l-1.365.947a.683.683,0,0,0-.325.231,1.368,1.368,0,0,0-.9.532l-.625-.047a.6.6,0,0,0-.452.3.592.592,0,0,1-.451.3h-.139l-.277-.046-.764.185a2.056,2.056,0,0,1-1-.5q-.672-.5-.671-.867l-.139-1.039a1.247,1.247,0,0,1,.185-.323.913.913,0,0,0,.185-.393.787.787,0,0,0-.046-.185v-.185a4.443,4.443,0,0,1,.577-1.941v-.092c0-.061-.046-.092-.138-.092q-.3,0-.507.5a1.669,1.669,0,0,1-.482.7,3.04,3.04,0,0,0-.4.347.337.337,0,0,1-.217.138,1.033,1.033,0,0,0-.32-.138,1.42,1.42,0,0,1-.16-.278.943.943,0,0,0-.355-.381.563.563,0,0,1-.24-.519q0-.255.667-.67l.277-.278a4.315,4.315,0,0,1,1.427-1.132l.138-.323q.322-.255.794-.7a3.66,3.66,0,0,1,.84-.635L112.6,40.73a2.174,2.174,0,0,1,1.525-.508q.738,0,.739.947a2.707,2.707,0,0,1-.335,1.467,2.723,2.723,0,0,0-.416.947,3.066,3.066,0,0,1-.612,1.132,4.533,4.533,0,0,0-.647,1.04,5.344,5.344,0,0,1-.474.924,2.081,2.081,0,0,0-.358,1.051c0,.154.093.231.278.231a1.906,1.906,0,0,0,.994-.416l.208-.092a3.212,3.212,0,0,0,.462-.231l.578-.254a.837.837,0,0,1,.509-.462l.439-.232q.324-.138.8-.358a1.487,1.487,0,0,0,.612-.427,1.084,1.084,0,0,1,.358-.335,2.5,2.5,0,0,0,.5-.4q.6,0,1.664-1.04,1.063-.624,1.989-1.236a11.473,11.473,0,0,0,1.225-.889,3.782,3.782,0,0,1,.5-.254,4,4,0,0,0,.81-.52,1.777,1.777,0,0,1,1.143-.358,1.814,1.814,0,0,1,1.155.45,1.223,1.223,0,0,1,.555.889l-.047,1.11a2.845,2.845,0,0,1-.577,1.8,4.433,4.433,0,0,1-.324,1.27l.047.532q0,.138-.509.462m-10.943,17.7.116-.323a.632.632,0,0,1,.323-.323,2.28,2.28,0,0,1,.623-1.294,1.777,1.777,0,0,1,.047-.578l.323-.3.9-1.525a6.443,6.443,0,0,1,.3-.612,3.327,3.327,0,0,0,.255-.566,3.022,3.022,0,0,1,.762-1.271V57.71c0-.215-.046-.323-.139-.323a1.477,1.477,0,0,1-.462.323l-1.478,1.248a7.166,7.166,0,0,0-.623.739l-.439.462a2.625,2.625,0,0,1-.566.5,1.653,1.653,0,0,0-.484.67c-.193.377-.358.566-.5.566h-.092a1.352,1.352,0,0,1-.231-.116.222.222,0,0,0-.138.208l.138.555c0,.061-.062.158-.185.289a2.046,2.046,0,0,0-.311.427.548.548,0,0,1-.266.277q-.139.046-.508.855l-.439.231a3.328,3.328,0,0,1-.854,2.2,5.117,5.117,0,0,0-.3.727,1.3,1.3,0,0,1-.208.451c-.092.569-.254.9-.485.993a.149.149,0,0,0-.092.139c0,.092.069.185.208.277l.092.093a4.762,4.762,0,0,0-.3,1.339.082.082,0,0,0,.092.093l.693-.346a1.958,1.958,0,0,0,.994-.878l.369-.717a.484.484,0,0,1,.323-.184.9.9,0,0,1,.451-.624q.311-.14.311-.37a6.393,6.393,0,0,1,.866-1.594,12.6,12.6,0,0,0,.912-1.548" fill="#00b0ea"/>
                                    <path id="Path_438" data-name="Path 438" d="M171.387,56.144h-9.6l-.911-5.262a10.732,10.732,0,0,0-1.159-.132c-3.259-.01-6.519.017-9.778-.022a1.888,1.888,0,0,0-1.808.921c-.852,1.3-1.791,2.544-2.681,3.821a1.458,1.458,0,0,1-1.3.77c-2.721-.026-5.443-.011-8.316-.011a3.968,3.968,0,0,1,.341-.816q9.439-12.525,18.893-25.039a1.506,1.506,0,0,1,1.282-.8c3.064.034,6.129.026,9.193.04a1.849,1.849,0,0,1,.43.169l5.407,26.364M158.691,37.334c-1.317,1.076-5.949,7.685-6.15,8.752,2.5-.006,4.978.135,7.594-.1l-1.444-8.656" fill="#004a8e"/>
                                    <path id="Path_439" data-name="Path 439" d="M265.043,56.121l.278-1.922c-.513.206-.871.314-1.194.486a17.706,17.706,0,0,1-10.3,1.912,6.893,6.893,0,0,1-4.1-1.7,3.977,3.977,0,0,1-1.265-4.094,7.22,7.22,0,0,1,3.687-4.832,18.189,18.189,0,0,1,6.926-2.1c2.7-.309,5.42-.446,8.129-.683.585-.051,1.348.14,1.507-.77a1.584,1.584,0,0,0-1.017-1.759,12.464,12.464,0,0,0-2.957-.688,26.316,26.316,0,0,0-9.511,1.02c-.5.134-1.008.2-1.763.353l1.315-4.793c2.017-.254,3.979-.581,5.954-.732a40.355,40.355,0,0,1,11.9.454,11.063,11.063,0,0,1,2.6.917,3.909,3.909,0,0,1,2.233,4.843q-1.47,5.787-3.121,11.528c-.9,3.154-.067,2.589-3.545,2.643-1.458.023-2.917.01-4.376,0-.425,0-.849-.051-1.371-.084m2.463-9.4c-1.6.1-2.857.131-4.1.28a23.423,23.423,0,0,0-3.269.627,3.5,3.5,0,0,0-2.372,1.767c-.754,1.492-.266,2.543,1.359,2.93a9.7,9.7,0,0,0,6.606-.961,1.2,1.2,0,0,0,.62-.562c.4-1.275.734-2.57,1.154-4.083" fill="#004a8e"/>
                                    <path id="Path_440" data-name="Path 440" d="M326.156,36.287c2.091-.149,4.052-.073,6.089-.06l-.281,2.052c.685-.294,1.2-.5,1.7-.732a17.4,17.4,0,0,1,9.314-1.858,11.668,11.668,0,0,1,2.83.613,4.321,4.321,0,0,1,2.932,4.957,50.372,50.372,0,0,1-1.181,4.954c-.787,2.957-1.626,5.9-2.417,8.855-.165.615-.355,1.094-1.116,1.085-2.479-.031-4.957-.041-7.436-.065-.087,0-.174-.075-.355-.157a7.287,7.287,0,0,1,.133-.917c.832-3.1,1.688-6.185,2.5-9.285a14.981,14.981,0,0,0,.475-2.573,1.947,1.947,0,0,0-1.509-2.3,1.818,1.818,0,0,0-.321-.04,10.6,10.6,0,0,0-6.116.844c-.664.265-.742.839-.9,1.394-.969,3.512-1.9,7.032-2.912,10.533-.882,3.065-.105,2.573-3.431,2.613-1.75.021-3.5-.009-5.251-.024a4.217,4.217,0,0,1-.707-.19l5.414-19.7h2.194" fill="#004a8e"/>
                                    <path id="Path_441" data-name="Path 441" d="M247.847,37.332c-.385,1.435-.752,2.887-1.171,4.323a.865.865,0,0,1-1.327.651,7.547,7.547,0,0,1-.991-.606,11.4,11.4,0,0,0-9.8-1.159,8.124,8.124,0,0,0-5.668,7.393,3.6,3.6,0,0,0,2.526,3.833,11.727,11.727,0,0,0,6.179.393,14.369,14.369,0,0,0,4.932-1.7,16.334,16.334,0,0,1,1.907-.707c-.517,1.9-.891,3.432-1.38,4.929a1.566,1.566,0,0,1-.968.726,26.387,26.387,0,0,1-6.86,1.243,26.909,26.909,0,0,1-8.54-.665,15.23,15.23,0,0,1-3.986-1.7,6.176,6.176,0,0,1-2.814-6.683c.7-4.324,3.227-7.286,6.974-9.331a22.8,22.8,0,0,1,9.067-2.505,27.112,27.112,0,0,1,10.114.813c.465.137.921.3,1.375.475a2.67,2.67,0,0,1,.435.285" fill="#004a8e"/>
                                    <path id="Path_442" data-name="Path 442" d="M298.794,28.475c-.264,1.051-.469,1.941-.711,2.821q-3.2,11.662-6.416,23.324a3.538,3.538,0,0,1-.306.967c-.16.249-.472.561-.722.565-2.618.041-5.237.025-7.848.025-.049-1.226,6.18-24.451,7.4-27.7Z" fill="#004a8e"/>
                                    <path id="Path_443" data-name="Path 443" d="M203.464,56.215c-2.88.008-5.67.009-8.677,0L200.263,36.3h8.622l-.483,2.693c.715-.328,1.223-.547,1.719-.791a17.036,17.036,0,0,1,7.085-2.037c.664-.018,1.329.051,2.128.086l-1.559,5.671a5.878,5.878,0,0,1-.9-.006,21.841,21.841,0,0,0-8.67.541,1.465,1.465,0,0,0-1.225,1.222c-.993,3.706-2.035,7.4-3.063,11.1-.127.457-.282.907-.449,1.441" fill="#004a8e"/>
                                    <path id="Path_444" data-name="Path 444" d="M300.315,56.2l5.474-19.929h8.671c-.119.547-.2,1.009-.318,1.459q-2.334,8.5-4.677,17c-.4,1.461-.408,1.464-1.987,1.467h-7.163" fill="#004a8e"/>
                                    <path id="Path_445" data-name="Path 445" d="M182.428,36.287h8.743l-5.456,19.856H176.98Z" fill="#004a8e"/>
                                    <path id="Path_446" data-name="Path 446" d="M183.29,33.145l1.279-4.7h8.747c-.393,1.43-.722,2.77-1.151,4.078a1.111,1.111,0,0,1-.834.591c-2.56.046-5.121.027-8.041.027" fill="#004a8e"/>
                                    <path id="Path_447" data-name="Path 447" d="M306.707,33l1.224-4.533h8.613a21.8,21.8,0,0,1-1.056,4.176.727.727,0,0,1-.543.393c-2.7.082-5.393.143-8.238-.037" fill="#004a8e"/>
                                    <path id="Path_448" data-name="Path 448" d="M16.046,51.884s-.074.037-.221.129c.129-.239.276-.46.423-.68,3.218-4.431-.2.552-.2.552" fill="#353e75"/>
                                    <path id="Path_449" data-name="Path 449" d="M30.178,30.223c.092.331,1.306,6.528,1.306,6.528s8.311-4.689,8.55-4.836,4.229-2.74,4.229-2.74l2.17-.827,9.635,5.259-1.342,5.075s-3.9,3.586-4.56,4.248c-.662.68-2.059,2.666-4.137,2.133s-4.836-1.1-4.836-1.1a41.451,41.451,0,0,1-.2,4.634c-.2.717-1.545,5.847-1.545,5.847l-3.53,2.942-4.781-2.464-3.092-1.455L26.721,52s-5.443-1.361-5.774-1.25-7.98-.57-8.55-.276c-.588.294-2.17,1.25-2.28-.092a9.99,9.99,0,0,1,.147-3.586c.331-1.545.055-3.678,1.25-4.689a16.744,16.744,0,0,1,3.439-2.317c.147.092,3.586.588,3.586.588l1.361.717,2.372,1.1,2.372,1.25s1.214-.147,1.4-.2a8.565,8.565,0,0,0,2.023-.4,2.556,2.556,0,0,0,.478-1.324c-.037-.386-.478-2.519-.478-2.758a35.752,35.752,0,0,1-.423-3.678,12.68,12.68,0,0,0-.9-3.328s1.692-.827,1.8-.827a15.139,15.139,0,0,0,1.637-.7" fill="#fab811"/>
                                    <path id="Path_450" data-name="Path 450" d="M2.927,40.87A21.525,21.525,0,0,1,6.917,37.4l.221.5s.4-.791-.221-.5l-1.1-2.39,2.629.4s2.721-8.017,4.523-8.256S20.8,40.664,25.951,41.694c5.149,1.011-2.758-3.917-3.291-6.987,0,0-3.549-14.673,4.542-17.009s9.249,1.269,9.249,1.269l.273,1.948,2.133-.993.5,2.9s6.178-1.066,5.443,1.618S33.491,29.7,32.02,35.772a81.468,81.468,0,0,1,12.246-6.583,87.5,87.5,0,0,1-11.5,11.993c-.754-1.379-3.034-5.645-4.3-8.183a81.525,81.525,0,0,1,.975,11.217l-4.873-.478s.515,2.243-.791,1.765c-1.306-.5-5.149-3.365-5.719-2.446-.588.919,4.634,2.887,1.784,2.556s-8.072,2.813-8.072,2.813a94.678,94.678,0,0,1,10.2-1.324l4.928-.129c.2,1.728,2.869,2.115,3.9,2.262,1.03.165.68-3.108,1.968-1.82s3.181,6.969,3.181,6.969c.257-1.434-.864-8.091-.864-8.091a26.491,26.491,0,0,0,1.967,2.5c.791.809,2.207.092,2.3-2.1s-4.542-2.519-2.39-4.4c2.151-1.857,7.226,1.692,8,.736.772-.975-1.563-3.77-1.563-3.77.717-.349,9.3-3.494,9.3-3.494-3.935-.074-12.118,2.868-16.586,4.615a105.821,105.821,0,0,1,9.231-11.621c3.714-1.434,7.465-2.3,10.113-1.526,7.429,2.17,4.45,5.369,4.45,5.369l1.652,1.308L59.6,35.7,63,41.661s-.129,6.086-9.231,9.157L41.541,44.676S53.033,53.5,49.466,60.03s-7.594,3.751-7.594,3.751l-1.931-3.255L38.36,63.247l-1.379-.864s-9.948,3.089-10.886,2.648c-.9-.441-2.023-8.44.644-13.019a1.574,1.574,0,0,0,.221-.129s3.42-4.983.2-.552c-.147.221-.294.441-.423.68-1.287.717-7.944,4.671-10.83,10.628-3.218,6.62-9.065-1.14-9.065-1.14l.46-2.464H5.777L1.364,57.527c0,.018-3.935-11.2,1.563-16.659" fill="#ee4822"/>
                                    <path id="Path_451" data-name="Path 451" d="M50.993,20.147a2.593,2.593,0,0,1,.147-.809,3.711,3.711,0,0,1-.515.57c-1.067.993-2.225,1.269-2.611.607s.165-2,1.232-3,2.225-1.269,2.611-.607a1.331,1.331,0,0,1,.055.975,6.665,6.665,0,0,1,.772-.864c1.324-1.232,2.777-1.581,3.255-.772.46.791-.166,2.372-1.4,3.586a.5.5,0,0,1,.129.147c.386.662-.165,2-1.232,2.979s-2.225,1.269-2.611.607a1.219,1.219,0,0,1-.092-.791C49.1,24.54,47.2,26.6,45.327,28.733c-.349.129-.7.276-1.048.423,2.1-2.556,4.358-5.553,6.712-9.01" fill="#fab811"/>
                                    <path id="Path_452" data-name="Path 452" d="M58.017,5.215c-.386-.662.166-1.986,1.232-2.979S61.474.967,61.86,1.629s-.165,2-1.232,3c-1.066.975-2.225,1.25-2.611.588" fill="#fab811"/>
                                    <path id="Path_453" data-name="Path 453" d="M51.191,12.056c-.294-.533.129-1.6.993-2.39.846-.791,1.784-1.011,2.078-.5.294.533-.147,1.6-.993,2.39s-1.765,1.011-2.078.5" fill="#fab811"/>
                                    <path id="Path_454" data-name="Path 454" d="M66.641.288c.294.533-.129,1.6-.993,2.39-.846.791-1.784,1.011-2.078.5-.294-.533.129-1.6.993-2.39.846-.809,1.784-1.03,2.078-.5" fill="#fab811"/>
                                    <path id="Path_455" data-name="Path 455" d="M58.587,18c-.386-.662.165-2,1.232-3s2.225-1.269,2.611-.607-.165,2-1.232,3-2.243,1.269-2.611.607" fill="#fab811"/>
                                    <path id="Path_456" data-name="Path 456" d="M60.941,7.974c.478.827-.2,2.5-1.545,3.751-1.324,1.232-2.777,1.581-3.255.772-.478-.827.221-2.5,1.545-3.733,1.324-1.269,2.777-1.6,3.255-.791" fill="#fab811"/>
                                  </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <!-- Added for mobile -->
                <div class="hamburger">
                    <div class="nav-ham">
                        <div class="btns not-open">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
    
            <div class="link-header od-ItemsScopeItemContent w100">
                            <div class="inner-link-header w100 cnt-90">
                                <nav>
                                    <ul class="flex-basic flex-align-center flex-justify-center">
                                        <li>
                                        <div >
                                        <a href="https://ncaircalin.sharepoint.com/sites/TestMyGed/SitePages/Page-D'accueil.aspx" class="flex-basic-n flex-align-center">
                                
                
                                        <div class="text">
                                            Accueil
                                        </div>
                                    </a> </div>
                                     
                                        </li>
                
                                        <li>
                                             <div class="dropdown">
                                            <button class="dropbtn">Choisissez un département</button>
                                            <div class="dropdown-content">
                                              <a href="https://ncaircalin.sharepoint.com/sites/TestMyGed/SitePages/Home.aspx?folder=615">DG</a>
                                              <a href="https://ncaircalin.sharepoint.com/sites/TestMyGed/SitePages/Home.aspx?folder=3">DSC</a>
                                              <!--    <a href="#">DE</a>
                                              <a href="#">DO</a>
                                              <a href="#">DT</a>
                                             <a href="#">CGO</a>
                                              <a href="#">SURETE</a>
                                              <a href="#">CRISE</a>
                                              <a href="#">AI</a>
                                              <a href="#">CG</a>
                                              <a href="#">DCM</a>
                                              <a href="#">CGO</a> -->
                                            </div>
                                          </div>
                                                                                      
                                
                                        </li>
                
                                        <li>
                                        <a href="javascript:void(0)" class="flex-basic-n flex-align-center">
                                          
                                                <div class="text">
                                                Marque-pages
                                                </div>
                                                </a>
                                        </li>
                
                                        <li>
                                            <a href="https://ncaircalin.sharepoint.com/sites/TestMyGed/SitePages/Home.aspx?folder=1" class="flex-basic-n flex-align-center">
                                          
                
                                                <div class="text">
                                                Documentation
                                                </div>
                                            </a>
                                        </li>
                
                
                                        <li>
                                            <a href="javascript:void(0)" class="flex-basic-n flex-align-center">
                                                <div class="icn">
                                                    <img src="${require<string>('./images/icn-menu6.png')}" alt="">
                                                </div>
                
                                                <div class="text">
                                                    Webmail
                                                </div>
                                            </a>
                                        </li>
                
                                        <li>
                                            <a href="javascript:void(0)" class="flex-basic-n flex-align-center">
                                            <div class="icn">
                                            <img src="${require<string>('./images/icn-menu1.png')}" alt="">
                                        </div>
                
                                                <div class="text">
                                                   Intranet
                                                </div>
                                            </a>
                                        </li>

                                        <li>
                                        <a href="javascript:void(0)" class="flex-basic-n flex-align-center">
                                  
                                            <div class="text">
                                               Administration
                                            </div>
                                        </a>
                                    </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </header>`;
                }
            }
        } 
    }


    private _onDispose(): void {
        console.log('[HeaderAndFooterAppExtensionApplicationCustomizer._onDispose] Disposed from the top header and bottom footer placeholders.');
    }
}
