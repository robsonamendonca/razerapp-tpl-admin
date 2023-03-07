//Inicio carregar a sidebar aulas do curso na página de aula
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
$(document).mouseup(function (e) {
    var $div = $("#mySidenav"),
            $btn = $("button");
    if (!$div.is(e.target) && $div.has(e.target).length === 0) {
        if (!$btn.is(e.target) && $btn.has(e.target).length === 0) {
            if ($div.is(':visible')) {
                document.getElementById("mySidenav").style.width = "0";
            }
        }
    }
});
//Fim carregar a sidebar aulas do curso na página de aula

//Carregar o conteúdo da aula
$(document).ready(function () {
    var idtopicoaula = jQuery('.idtopicoaula').attr("data-topicoaula");
    var endereco = jQuery('.endereco').attr("data-endereco");
    if ((idtopicoaula !== undefined) && (endereco !== undefined)) {
        var dados = {
            idtopicoaula: idtopicoaula
        };
        $.post(endereco + 'aula-curso/view/?cont=2&listforum=1&idtopicoaula=' + idtopicoaula, dados, function (retorna) {
            if (retorna == false) {
                $("#list-forum").html("");
            } else {
                $("#list-forum").html(retorna);
            }
        });
        $.post(endereco + 'aula-curso/view/?cont=2&listaulas=1&idtopicoaula=' + idtopicoaula, dados, function (retorna) {
            if (retorna == false) {
                $("#list-aulas").html("<div class='alert alert-danger'>Aulas não encontradas1!</div>");
            } else {
                $("#list-aulas").html(retorna);
            }
        });
    }
});
//Cadastrar pergunta do fórum na aula
$("#insert_form").on("submit", function (event) {
    event.preventDefault();
    var endereco = jQuery('.endereco').attr("data-endereco");
    $.ajax({
        method: "POST",
        url: endereco + 'aula-curso/view/?cont=2&addcomt=1',
        data: new FormData(this),
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#SendCadForum').html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Enviando...");
        },
        success: function (retorna) {
            if (retorna['erro']) {
                $('#insert_form')[0].reset();
                $('#SendCadForum').html("Cadastrar");
                $('#msg-cad-coment').html("");
                $('#msgCadSucesso').modal('show');
                listar_coment();
            } else {
                $('#SendCadForum').html("Cadastrar");
                $('#msg-cad-coment').html(retorna['msg']);
            }
        }
    });
});
//Atualizar a lista de comentários quando o usuário posta um comentário
function listar_coment() {
    var idtopicoaula = jQuery('.idtopicoaula').attr("data-topicoaula");
    var endereco = jQuery('.endereco').attr("data-endereco");
    var dados = {
        idtopicoaula: idtopicoaula
    };
    $.post(endereco + 'aula-curso/view/?cont=2&listforum=1&idtopicoaula=' + idtopicoaula, dados, function (retorna) {
        if (retorna == false) {
            $("#msg").html("");
        } else {
            $("#list-forum").html(retorna);
        }

    });
}

//Inicio listar fórum
$(document).ready(function () {
    var listarReg = jQuery('#listarDados').attr("data-listarDados");
    if (listarReg == "listResult") {
        var pagina = 1;
        listar(pagina);
    }
});

function listar(pagina, varcomp = null) {
    $("#conteudo").html("");
    $("#msg").html("<div class='text-center'><div class='spinner-border text-info' role='status'><span class='sr-only'>Loading...</span></div></div>");
    var endereco = jQuery('.endereco').attr("data-endereco");
    var turmaid = jQuery('.turmaid').attr("data-turmaid");
    if (turmaid !== undefined) {
        var dados = {
            pagina: pagina
        };
        $.post(endereco + pagina + '?tiporesult=1&turmaid=' + turmaid, dados, function (retorna) {
            $("#msg").html("");
            $("#conteudo").html(retorna);
        });
}
}

$(function () {
    var endereco = jQuery('.endereco').attr("data-endereco");
    $("#pesqCursos").keyup(function () {
        $("#conteudo").html("");
        $("#msg").html("<div class='text-center'><div class='spinner-border text-info' role='status'><span class='sr-only'>Loading...</span></div></div>");
        var pesqCursos = $(this).val();
        if (pesqCursos !== '') {
            var turmaid = jQuery('.turmaid').attr("data-turmaid");
            if (turmaid !== undefined) {
                var dados = {
                    palavraPesq: pesqCursos
                };
                $.post(endereco + pagina + '?tiporesult=2&turmaid=' + turmaid, dados, function (retorna) {
                    $("#msg").html("");
                    $("#conteudo").html(retorna);
                });
            }
        } else {
            var pagina = 1;
            listar(pagina);
        }
    });
});
//Fim listar fórum

//Cadastrar pergunta no fórum na pagina ver as perguntas do topico
$("#insert_perg").on("submit", function (event) {
    event.preventDefault();
    var endereco = jQuery('.endereco').attr("data-endereco");
    $.ajax({
        method: "POST",
        url: endereco + 'ver-topico-forum/ver-topico-forum/?cont=2&addcomt=1',
        data: new FormData(this),
        contentType: false,
        processData: false,
        beforeSend: function () {
            $('#SendCadForum').html("<span class='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span> Enviando...");
        },
        success: function (retorna) {
            if (retorna['erro']) {
                $('#insert_perg')[0].reset();
                $('#SendCadForum').html("Cadastrar");
                $('#msg-cad-coment').html("");
                $('#msgCadSucesso').modal('show');
                listar_coment_top();
            } else {
                $('#SendCadForum').html("Cadastrar");
                $('#msg-cad-coment').html(retorna['msg']);
            }
        }
    });
});
//Atualizar a lista de comentários quando o usuário posta um comentário
function listar_coment_top() {
    var idtopicoforum = jQuery('.idtopicoforum').attr("data-topicoforum");
    var endereco = jQuery('.endereco').attr("data-endereco");

    var dados = {
        idtopicoforum: idtopicoforum
    };
    //alert(endereco + 'ver-topico-forum/ver-topico-forum/?cont=2&listforum=1&idtopicoforum=' + idtopicoforum);
    $.post(endereco + 'ver-topico-forum/ver-topico-forum/?cont=2&listforum=1&idtopicoforum=' + idtopicoforum, dados, function (retorna) {
        if (retorna == false) {
            $("#msg").html("");
            $("#list-forum").html("A");
        } else {
            $("#list-forum").html(retorna);
            //$("#list-forum").html("");
        }

    });
}

function sitRevAula(id) {
    var editrevaula = jQuery('.editrevaula').attr("data-editrevaula");

    $.ajax({
        method: "POST",
        url: editrevaula + '?cont=2&editrev=1&aulaid=' + id,
        contentType: false,
        processData: false,
        success: function (retorna) {
            $('#msg-edit-rev').html(retorna['msg']);
            if (retorna['erro']) {
                if (retorna['revisar'] === 1) {
                    $('#altsitrev').html("<span id='altsitrev'><a href='javascript:sitRevAula(" + id + ");'><i class='fas fa-history text-primary' data-toggle='tooltip' data-html='true' title='Marcado o lembrete para revisar a aula'></i> (Desmarcar revisão)</a></span>");
                } else {
                    $('#altsitrev').html("<span id='altsitrev'><a href='javascript:sitRevAula(" + id + ");'><i class='fas fa-check text-danger' data-toggle='tooltip' data-html='true' title='Marcado o lembrete para revisar a aula'></i> (Marcar revisão)</a></span>");
                }

            } 
        }
    });
}