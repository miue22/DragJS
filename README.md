# DragJS
해당 기능은 `HTML5`에서 기본적으로 지원하는 API입니다.  따라서 `HTML`과 `Plain Javasciprt`로 충분히 구현할 수 있습니다.
이 문서는 단지 더 편리하게 재사용을 하기 위해 `JQuery`로 리팩토링한 결과물을 기록한 것입니다.

### Purpose
<img src='http://drive.google.com/uc?export=view&id=191dnTSZuQP0dkNWO92wdWu-EoU1dWtxs' /><br>

`HTML5`에서 제공하는 `Drag&Drop API`는 특정 대상 element를 마우스로 끌어(Drag) 다른 element에 포함(Drop)시키는 기능을 합니다.  
하지만 포함이 아닌 각 요소의 순서를 바꿀 때 사용하고 싶어 해당 기능이 가능하도록 커스터마이징하였습니다.

### Description
`HTML`의 element는 기본적으로 드래그가 불가능하게 설정되어 있습니다.  
따라서 element에 `draggable="true"`가 선언되어야 기능이 동작합니다.
```
<div draggable="true"></div>
```
 
해당 행위에는 총 8가지 이벤트가 발생하며, 각 이벤트는 순차적으로 발생합니다.
모든 이벤트에 대한 핸들러를 만들 필요는 없지만, 다음 이벤트는 필수적입니다.
* `dragstart` : Drag가 시작될 때 발생하는 이벤트.
* `dragover` : Drag가 진행중일 때 Drop할 대상 위(over)에서 발생하는 이벤트
* `drop` : Drag 된 대상이 Drop될 때 발생하는 이벤트

참고로, JQuery를 이용해 `.on()`, `bind()` 등의 이벤트 바인딩 함수를 사용 할 때는 `dragEvent`가 온전히 전달되지 않습니다.  
왜냐하면 JQuery에서는 이벤트 바인딩시 `event`객체가 아닌 `JQuery.event`객체를 전달하기 때문이다.
(일반적인 이벤트의 경우는 동일하게 사용해도 무방하나, `DragEvent`는 지원하지 않는 듯.)
따라서 `var event = event.originalEvent;`와 같이 `event.originalEvent`를 통해 사용해야 합니다.
### Function
1. onDragStart(event)
```
function onDragStart(event){
  event.dataTransfer.setData("text/plain", event.target.id);
  //드래그하려는 타겟의 id를 dataTransfer에 등록
}
```
Drag가 시작되는 시점입니다. Drag할 때 발생하는 `DragEvent`는 여타 event와는 다르게 객체 내에 `dataTransfer` 속성이 존재합니다. 
이 속성은 특정 대상 element를 Drag할 때 데이터를 담을 수 있는 속성입니다.  
필수적으로 `setData({format}, {data})`함수를 사용해야 합니다. 자세한 스펙은 [dataTransfer](https://developer.mozilla.org/ko/docs/Web/API/DataTransfer)에서 확인할 수 있습니다. 

2. onDragOver(event)
```
function onDragOver(event){
  event.preventDefault();
  //대상을 Drop 가능하도록 만들어준다.
}
```
Drag 중 밀리 초 단위로 계속 발생하는 이벤트입니다.  
이 단계에서 `event.preventDefault()`를 호출하여 대상을 Drop가능하게 만들어야 합니다.

3. onDrop(event)
```
function onDrop(event){
  var id = event.dataTransfer.getData("text/plain");

  var top = $(event.target).closest(".layout-box").position().top; //Drop할 요소의 top
  var height = $(event.target).closest(".layout-box").height(); //Drop할 요소의 길이(세로)
  var dot = event.y; // 현재 Drag가 머물러있는 점의 좌표
  var dot_in_element = dot - top; // 요소 안에서의 점의 좌표

  if(dot_in_element >= height/2 ){
	$(event.target).closest(".layout-box").after($("#"+id));
  }
  else if(dot_in_element < height/2 ){
	$(event.target).closest(".layout-box").before($("#"+id));
  }
}
```
<img src='http://drive.google.com/uc?export=view&id=1-K_YylxbvShUhXyvxJN_nQ_3OPMF3Ec3' /><br>

Drop시 발생하는 이벤트입니다. 
우선 `dataTransfer`객체에서 `onDragStart` 이벤트 때 담은 데이터를 불러옵니다. 이 역시 필수적으로 `getDta('format')`함수를 사용해야 합니다.  
사진처럼 element의 길이, 양 끝 위치를 알면 가운데를 기준으로 Drop 지점이 위인지 아래인지 알 수 있습니다.  
Drop 지점이 위라면 해당 element의 이전 구간에 `element.before( drag element )`를 통하여 렌더링합니다.
반대로 아래라면 다음 구간에 `element.after( drag element )`을 통하여 렌더링합니다. 


### Example
예제는 `drag.js`와 `drag.html`에 있습니다.

### Reference
* [HTML드래그 앤 드롭 API](https://developer.mozilla.org/ko/docs/Web/API/HTML_%EB%93%9C%EB%9E%98%EA%B7%B8_%EC%95%A4_%EB%93%9C%EB%A1%AD_API)


by HTML, CSS, Javascript, JQuery
2018.05.20 Jun Kim
