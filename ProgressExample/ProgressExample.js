app.LoadScript('Progress.js');


function OnStart() {
    var lay = app.CreateLayout("Linear", "Bottom FillXY");
    lay.SetBackColor("#ffffff");
    var btn = app.CreateButton('Прогресс без отмены (на 5 сек.)', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgress);
    lay.AddChild(btn);
    var btn = app.CreateButton('Прогресс без отмены с заголовком (на 5 сек.)', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressHead);
    lay.AddChild(btn);
    btn = app.CreateButton('Прогресс с отменой', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressCancel);
    lay.AddChild(btn);
    btn = app.CreateButton('Прогресс с отменой и заголовком', 0.8, 0.1, 'lego');
    btn.SetOnTouch(ExampleProgressHeadCancel);
    lay.AddChild(btn);
    btn = app.CreateButton('Поменять стиль', 0.8, 0.1, 'lego');
    btn.SetOnTouch(EditStyleProgress);
    lay.AddChild(btn);
    app.AddLayout(lay);
}


var timeout; //для демонстрации р-ты без кнопки отмены.

function ExampleProgress()
{
    ShowProgress("ExampleProgress");
    //поменяем текст через 2 сек:
    setTimeout('UpdateTextProgress("Меняем текст ggdggsgsgs gssgxsgssgx ggcdgdgcgcstqqyhsgcg hsgdggcggc")', 2000);
    //будет работать 5 сек:
    timeout = setTimeout(function(){
            HideProgress();
            clearTimeout(timeout);
            app.ShowPopup('Время вышло.');
        }, 5000);
}

function ExampleProgressHead()
{
    ShowProgress("ExampleProgress", "Заголовок");
    //поменяем текст через 2 сек:
    setTimeout('UpdateTextProgress("Меняем текст ggdggsgsgs gssgxsgssgx ggcdgdgcgcstqqyhsgcg hsgdggcggc")', 2000);
    //будет работать 5 сек:
    timeout = setTimeout(function(){
            HideProgress();
            clearTimeout(timeout);
            app.ShowPopup('Время вышло.');
        }, 5000);
}


function ExampleProgressCancel()
{
    ShowProgress("ExampleProgressCancel", Cancel);
    //поменяем текст через 2 сек:
    setTimeout('UpdateTextProgress("Меняем текст uusuaayxyxyxyyx uxuxycychhxhcg hxhxhhcgc hxhchcchc")', 2000);
}


function ExampleProgressHeadCancel()
{
    ShowProgress("ExampleProgressCancel", 'Заголовок', Cancel);
    //поменяем текст через 2 сек:
    setTimeout('UpdateTextProgress("Меняем текст uusuaayxyxyxyyx uxuxycychhxhcg hxhxhhcgc hxhchcchc")', 2000);
}


//назначенная функция отмены:
function Cancel()
{
    app.ShowPopup('Progress cancel');
    clearTimeout(timeout);
}


function EditStyleProgress()
{
    var style = GetStyleProgress();
    if (style == 'White')
        SetStyleProgress('Black');
    else
        SetStyleProgress('White');
    app.ShowPopup('Style "' + GetStyleProgress() + '"');
}

