/**             Drag             **/
function onDragStart(event){
	var event = event.originalEvent;
	if( $(".layout-box").attr("draggable") == "true" ){
		if(event.target.tagName.toLowerCase() == "div"){
			event.dataTransfer.setData("text/plain", event.target.id);
			//드래그하려는 타겟의 id를 dataTransfer에 등록
		}
		else{
			event.preventDefault();
		}
	}
	
}

function onDragEnter(event){
	var event = event.originalEvent;
	var types = event.dataTransfer.types;

	for ( var i = 0; i < types.length; i++){
		if(types[i] == "text/plain"){
			event.preventDefault();
			return;
		}
	}
}

function onDragOver(event){
	var event = event.originalEvent;
	var top = $(event.target).closest(".layout-box").position().top; //요소의 top
	var height = $(event.target).closest(".layout-box").height(); //요소의 길이(세로)
	var dot = event.y; // 점의 좌표
	var dot_in_element = dot - top; // 요소 안에서의 점의 좌표

	if(dot_in_element >= height/2 ){
		$(event.target).closest(".layout-box").removeClass("move-effect-top");
		$(event.target).closest(".layout-box").addClass("move-effect-bottom");
	}
	else if(dot_in_element < height/2 ){
		$(event.target).closest(".layout-box").removeClass("move-effect-bottom");
		$(event.target).closest(".layout-box").addClass("move-effect-top");
	}
	
	event.preventDefault();
}

function onDragEnd(event){ //Drag가 종료되었을 때(Drop 발생 혹은 Drag 취소)
	var event = event.originalEvent;

	$(".layout-box").removeClass("move-effect-top");
	$(".layout-box").removeClass("move-effect-bottom");
}

function onDragLeave(event){ //Drag가 Drop할 수 있는 영역을 벗어났을 때 
	var event = event.originalEvent;

	$(event.target).closest(".layout-box").removeClass("move-effect-top");
	$(event.target).closest(".layout-box").removeClass("move-effect-bottom");
}

function onDrop(event){
	var event = event.originalEvent;

	console.log("on Drop");

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
