$(function() {
  console.log('js is twerking');
  pageLoad();
});

function pageLoad() {
  getQuestions();
  // getAnswers();
  $('#new-question-form').on('submit', function(event){
    event.preventDefault();
    var question = {question: $('#question-input').val()}
    // debugger

    // $('.formHidden').on('submit', function(event){
    // event.preventDefault();
    // var hv = $('#h_v').val();

    $.post('/questions', question)
      .done(function(res){
        getQuestions();
        $('#new-question-form')[0].reset();
        // $('#h_v')[0].reset();
      });
  });
}

function getQuestions() {
  $.get('/questions.json', function(res){
    renderQuestions(res); 
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

function comment() {
  $('.formHidden').toggle('fast')
}