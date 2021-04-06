$(document).ready(function() {
    $('#summernote').summernote({
        height: 300,
        minHeight: null,
        maxHeight: null,
        spellCheck: true,
        focus: true,
        toolbar: [
            // [groupName, [list of button]]
            ['basic', ['style', 'fontname', 'fontsize']],
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['forecolor', 'backcolor']],
            // ['block', ['ul', 'ol', 'paragraph']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['media', ['link', 'picture', 'video', 'table', 'hr']],
            ['height', ['height', 'codeview', 'fullscreen', 'undo', 'redo']]
          ]
    })
});