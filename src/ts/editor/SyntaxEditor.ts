
class SyntaxEditor {

    constructor() {
        // Nothing much so far
    }
    changeStyling(newStyleSheet: string) {
        let styleLink = document.getElementById("currentSyntaxStyle");
        if(styleLink) {
            styleLink.setAttribute("href", newStyleSheet);
        } else
            console.log("This page is unable to change styles");
    }
};

const syntaxEditor = new SyntaxEditor();
