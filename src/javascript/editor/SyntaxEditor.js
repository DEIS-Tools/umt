class SyntaxEditor {
    ChangeStyling(newStyleSheet) {
        let styleLink = document.getElementById("currentSyntaxStyle");
        if (styleLink) {
            styleLink.setAttribute("href", newStyleSheet);
        }
        else
            console.log("This page is unable to change styles");
    }
}
const syntaxEditor = new SyntaxEditor();
