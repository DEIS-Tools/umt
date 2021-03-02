"use strict";
class SyntaxEditor {
    constructor() {
        // Nothing much so far
    }
    changeStyling(newStyleSheet) {
        let styleLink = document.getElementById("currentSyntaxStyle");
        if (styleLink) {
            styleLink.setAttribute("href", newStyleSheet);
        }
        else
            console.log("This page is unable to change styles");
    }
}
;
const syntaxEditor = new SyntaxEditor();
//# sourceMappingURL=SyntaxEditor.js.map