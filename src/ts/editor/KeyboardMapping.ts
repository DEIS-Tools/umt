
class KeyboardMapping {
    private static keymapping: Map<string, VoidFunction>;

    constructor() {
        KeyboardMapping.keymapping = new Map([
            ["delete", editor.RemoveSelectedElement.bind(editor)],
        ]); ;
    }

    public static BindKeymapping() {
        
    }
}
