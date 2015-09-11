$(function() {
  console.log('js is twerking');
  pageLoad();
});

function pageLoad() {
  getQuestions();
  $('#new-question-form').on('submit', function(event){
    event.preventDefault();
    var question = {question: $('#question-input').val()}
    $.post('/questions', question)
      .done(function(res){
        $('question-ul').empty();
        getQuestions();
        $('#new-question-form')[0].reset();
        });
    });
}

function postAnswers (event){
  event.preventDefault();
  event.stopPropagation();
  console.log(event);
  console.log(event.target);
  var answer = {answer: $('#answer-input').val(), questionID: event.target.classList[0]};
      $.post('/questions/answers', answer)
      .done(function(res){
        getQuestions();
      });
}

// let's play with functions, shall we?

function getQuestions() {
  $.get('/questions.json', function(res){
    renderQuestions(res); 
  });
}

function renderQuestions(questions) {
  template = _.template($('#question-template').html());
  template2 = _.template($('#answer-template').html());

  questions.forEach(function(question) {
    var questionHTML = template(question);
    $('#question-ul').append(questionHTML);


    question.answers.forEach(function(answer){
      console.log(answer)
      var answerHTML = template2(answer);
      var questionSelector = '#foo' + question._id
      console.log(questionSelector)
      $(questionSelector).append(answerHTML);
    });
  });

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
  $('#formHidden').toggle('fast')
}
