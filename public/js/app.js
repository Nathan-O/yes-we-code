$(function() {
  console.log('js is twerking');
  pageLoad();
});

function pageLoad() {
  getQuestions();
  $('#new-question-form').on('submit', function(event){
    event.preventDefault();
    var question = {question: $('#question-input').val()}
    // debugger

    $.post('/questions', question)
      .done(function(res){
        console.log(res);
        getQuestions();
        $('#new-question-form')[0].reset();
      });
  });
}

function getQuestions() {
  $.get('/questions.json', function(res){
    console.log(res)
    renderQuestions(res) 
  });
}

function renderQuestions(questions) {
  template = _.template($('#question-template').html());
  questionItems = questions.map(function(question) {
    return template(question);
  });
  $('#question-ul').append(questionItems);
}

function deleteQuestion(content) {
  var id = $(content).data()._id;
  $.ajax({
    url: '/questions/' + id,
    type: 'DELETE',
    success: function(res) {
      getQuestions();
      alert('Question deleted!');
    }
  });
}

function update(){
  $('update').click(function(event){
    prompt('Type your new question: ');
  })
  var updatedQuestion = $('#question').val();
  $.ajax({
      url: '/question/',
      type: 'PUT',
      data: updatedQuestion,
      success: function(){
        window.location.reload();
    }
  });
}
