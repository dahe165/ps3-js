window.emoticont3a = (function () {
    var b = function (m) {
        var j = m || {}, l = j.emoRange || "#comments p, div.emoWrap",
            k = j.putEmoAbove || "iframe#comment-editor",
            h = j.topText || "Click an Emoticon to view Code",
            a = j.emoMessage || "Untuk memasukkan emoticon kedalam komentar, sisipkan kode emot dan berikan spasi sebelumnya.";
        $(k).before('<div style="text-align:center" class="emoWrap"> :) :)) ;(( :-) =)) ;( ;-( :d :-d @-) :p :o :&gt;) (o) [-( :-? (p) :-s (m) 8-) :-t :-b  b-( :-# =p~ $-) (b) (f) x-) (k) (h) (c) cheer <br/><blink><b>' + h + "</b></blink><br/><marquee>" + a + "</marquee></div>");
        var i = function (c, d, e) {
            $(l).each(function () {
                $(this).html($(this).html().replace(/<br>:/g, "<br> :").replace(/<br>;/g, "<br> ;").replace(/<br>=/g, "<br> =").replace(/<br>\^/g, "<br> ^").replace(c, " <img style='max-height:24px' src='" + d + "' class='emo delayLoad' alt='" + e + "' />"))
            })
        };
 	i(/\s:\)\)+/g,"http://2.bp.blogspot.com/-LFlLVFHrMuU/UbMLKhVaFvI/AAAAAAAAFi8/eiAtkqADoG4/s320/u0014.gif",":))");
	i(/\s;\(\(+/g,"http://4.bp.blogspot.com/-llfP2gtLYtg/UbMLOv-GPQI/AAAAAAAAFk4/XuzxGH-qVYg/s320/u0030.gif",";((");
	i(/\s:\)+/g,"http://2.bp.blogspot.com/-pX0AezTSj7o/UbMLOYqPJDI/AAAAAAAAFk0/33SjzVwwzR8/s320/u0029.gif",":)");
	i(/\s:-\)+/g,"http://2.bp.blogspot.com/-hEyEx3MkBMY/UbMLTnxN68I/AAAAAAAAFnM/yytC2fo0jrU/s320/u0048.gif",":-)");
	i(/\s=\)\)+/g,"http://4.bp.blogspot.com/-Hy58UM7JccE/UbMLMNm2t5I/AAAAAAAAFjs/f2GlMCGX0Ng/s320/u0020.gif","=))");
	i(/\s;\(+/g,"http://2.bp.blogspot.com/-7YrlYnQesNQ/UbMLJUJ6h6I/AAAAAAAAFic/a6G-3BE4C90/s320/u0010.gif",";(");
	i(/\s;-\(+/g,"http://2.bp.blogspot.com/-Oj4IBHNQDFs/UbMLKDlMD6I/AAAAAAAAFio/F6yrpYHzoNc/s320/u0012.gif",";-(");
	i(/\s:d/ig,"http://2.bp.blogspot.com/-MS7FojVVUGQ/UbMLHtV3VPI/AAAAAAAAFho/C07FQM1wmCA/s320/u0004.gif",":d");
	i(/\s:-d/ig,"http://2.bp.blogspot.com/-ILg2ATR4a1o/UbMLR01OW0I/AAAAAAAAFmc/7-3m8JzvJdI/s320/u0042.gif",":-d");
	i(/\s@-\)+/g,"http://4.bp.blogspot.com/-QY2LuYf0_c4/UbMLHKHxYdI/AAAAAAAAFhk/fioUMxuefyQ/s320/u0003.gif","@-)");
	i(/\s:p/ig,"http://1.bp.blogspot.com/-Rtv1mcjJcA4/UbMLSmqPoyI/AAAAAAAAFm0/pl1a0EoxNbI/s320/u0045.gif",":p");
	i(/\s:o/ig,"http://1.bp.blogspot.com/-QaDtJS3OnN0/UbMLUJI__YI/AAAAAAAAFnc/Q5WnEj_d8AY/s320/u0050.gif",":o");
	i(/\s:&gt;\)+/g,"http://3.bp.blogspot.com/--IHUhlJKypA/UbMLVFpf0cI/AAAAAAAAFn4/n6Algh9k8DU/s320/u0054.gif",":&gt;)");
	i(/\s\(o\)+/ig,"http://4.bp.blogspot.com/-YlG6GWM2oFU/UbMLO4IqOsI/AAAAAAAAFlA/BDZyQv_fUO8/s320/u0031.gif","(o)");
	i(/\s\[-\(+/g,"http://4.bp.blogspot.com/-dq8OGt7ADgw/UbMLS0hQH8I/AAAAAAAAFm4/CI6VG9oPwkM/s320/u0046.gif","[-(");
	i(/\s:-\?/g,"http://4.bp.blogspot.com/-Nsvlxh6sZ48/UbMLQ_5nF_I/AAAAAAAAFl4/OjSaeR_zLwo/s320/u0039.gif",":-?");
	i(/\s\(p\)+/ig,"http://2.bp.blogspot.com/-j4Cb1KJICVE/UbMLLqZK_EI/AAAAAAAAFjY/hf4xumvw5q0/s320/u0018.gif","(p)");
	i(/\s:-s/ig,"http://1.bp.blogspot.com/-B480gp7a0Go/UbMLPK5O71I/AAAAAAAAFlM/bm_D2yWu0_0/s320/u0032.gif",":-s");
	i(/\s\(m\)+/ig,"http://3.bp.blogspot.com/-gMp6FVnNbto/UbMLJPsho-I/AAAAAAAAFiQ/ed1NdVm59DI/s320/u0009.gif","(m)");
	i(/\s8-\)+/ig,"http://2.bp.blogspot.com/-rmmrWOYY15c/UbMLIB3udjI/AAAAAAAAFh4/DyRemfqLs-c/s320/u0006.gif","8-)");
	i(/\s:-t/ig,"http://4.bp.blogspot.com/-Ppi-P996u1I/UbMLHHKRCSI/AAAAAAAAFhY/IDDEWa6g_6M/s320/u0002.gif",":-t");
	i(/\s:-b/ig,"http://2.bp.blogspot.com/-JMsay5VBKtc/UbMLJxuIHfI/AAAAAAAAFik/_SN3QV6iVqk/s320/u0011.gif",":-b");
	i(/\sb-\(+/ig,"http://2.bp.blogspot.com/-dxLiYGF7iIo/UbMLQGQ_CeI/AAAAAAAAFlk/rbmrOrt2sUc/s320/u0036.gif","b-(");
	i(/\s:-#/ig,"http://2.bp.blogspot.com/-huCR9XLbDq4/UbMLWdMHHlI/AAAAAAAAFoc/QqmG7V9LR7g/s320/u0058.gif",":-#");
	i(/\s=p~/ig,"http://1.bp.blogspot.com/-0nVNpaGu324/UbMLHzCCRmI/AAAAAAAAFh0/HuBJiVAgU9c/s320/u0005.gif","=p~");
	i(/\s\$-\)+/ig,"http://1.bp.blogspot.com/-qLOK3QbyTJw/UbMLWz_VffI/AAAAAAAAFos/bw7U9LhdqIg/s320/u0060.gif","$-)");
	i(/\s\(b\)+/ig,"http://4.bp.blogspot.com/-3beh8toMrHA/UbMLM-jYEeI/AAAAAAAAFkA/PV83JgPfGCE/s320/u0023.gif","(b)");
	i(/\s\(f\)+/ig,"http://1.bp.blogspot.com/-v3hQuLyuIGk/UbMLSafBwGI/AAAAAAAAFmo/fpB_zlQqrfI/s320/u0044.gif","(f)");
	i(/\sx-\)+/ig,"http://2.bp.blogspot.com/-T9zV9of66jo/UbMLNc9LFRI/AAAAAAAAFkQ/5owGzT9skhA/s320/u0025.gif","x-)");
	i(/\s\(k\)+/ig,"http://4.bp.blogspot.com/-M0hDWbBbnJk/UbMLNnJXZBI/AAAAAAAAFkY/fR7lQMiX2M4/s320/u0026.gif","(k)");
	i(/\s\(h\)+/ig,"http://2.bp.blogspot.com/-zbKGKmlFxkE/UbMLUVpu-kI/AAAAAAAAFng/znIFVLX0GvQ/s320/u0051.gif","(h)");
	i(/\s\(c\)+/ig,"http://3.bp.blogspot.com/-zgJD7z0EuEU/UbMLIUkO_rI/AAAAAAAAFiE/7lt0ocACeq4/s320/u0007.gif","(c)");
	i(/\scheer/ig,"http://3.bp.blogspot.com/-qLAg2RUMbAg/UbMLQwl4t5I/AAAAAAAAFmA/t6pvGWxXxN4/s320/u0038.gif","cheer");
        $("div.emoWrap").one("click", function () {
            if (a) {
                alert(a)
            }
        });
        $(".emo").css("cursor", "pointer").live("click", function (c) {
            $(".emoKey").remove();
            $(this).after('<input class="emoKey" type="text" size="' + this.alt.length + '" value=" ' + this.alt + '" />');
            $(".emoKey").trigger("select");
            c.stopPropagation()
        });
        $(".emoKey").live("click", function () {
            $(this).focus().select()
        })
		$(document).on("click", function () {
            $(".emoKey").remove()
        });
    };
    return function (a) {
        b(a)
    }
})();