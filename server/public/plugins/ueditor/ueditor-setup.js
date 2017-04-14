document.addEventListener('DOMContentLoaded', function() {
  UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
  UE.Editor.prototype.getActionUrl = function getActionUrl(action) {
    if (action === 'uploadimage') {
      return '/admin/ueditor/upload/image';
    } else if (action === 'catchimage') {
      return '/admin/ueditor/download/image';
    }

    return this._bkGetActionUrl(action);
  };

  UE.registerUI('formatter', function registerUI(editor, uiName) {
    // 注册按钮执行时的command命令，使用命令默认就会带有回退操作
    editor.registerCommand(uiName, {
      execCommand() {
        this.execCommand('selectall');
        this.execCommand('unlink');
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'font-size', 'width' );
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'font-family', 'width' );
        this.execCommand('fontsize', '14px');
        this.execCommand('fontfamily', '微软雅黑');
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'background-color', 'width' );
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'background', 'height' );
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'line-height', 'height' );
        this.execCommand( 'removeformat', 'strong,p,span,div,a', 'border', 'height' );

        editor.trigger('showmessage', {
          content: '格式化成功',
          timeout: 2000
        });
      }
    });
    // 创建一个button
    const btn = new UE.ui.Button({
      name: uiName,
      title: '格式化',
      cssRules: 'background: url(/img/formatter.png) no-repeat center center !important;',
      // 点击时执行的命令
      onclick() {
        // 这里可以不用执行命令,做你自己的操作也可
        editor.execCommand(uiName);
      }
    });

    // 当点到编辑内容上时，按钮要做的状态反射
    editor.addListener('selectionchange', () => {
      const state = editor.queryCommandState(uiName);

      if ( state === -1 ) {
        btn.setDisabled(true);
        btn.setChecked(false);
      } else {
        btn.setDisabled(false);
        btn.setChecked(state);
      }
    });

    return btn;
  });
});