$(document).ready(function() {
  $('body').fadeIn(1500).removeClass('hidden');
  $('#social').fadeIn(1500).removeClass('hidden');
  $('#attempts').fadeIn(1500).removeClass('hidden');
});

function init() {
  var google_sheet_url = 'https://docs.google.com/spreadsheets/d/12CSYHWSxXwUvfpoUaKjQNkcx88WcCwqovs_-Cg45Vrw/pubhtml';
  Tabletop.init({
    key: google_sheet_url,
    callback: play
  })
}
window.addEventListener('DOMContentLoaded', init)

function play(data, tabletop) {
  // markup
  title = data.Sheet2.elements[0].Title;
  desc = data.Sheet2.elements[0].Description
  source_name = data.Sheet2.elements[0].Source
  canonical = data.Sheet2.elements[0].Canonical
  twitter = data.Sheet2.elements[0].Twitter
  highest = data.Sheet2.elements[0].HighestOnTop
  conc = data.Sheet2.elements[0].Conclusion

  $('#main-title').html(title)
  $('#main-description').html(desc)
  $('a.source-link').attr('href', source_name)
  $('.rrssb-facebook a').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=' + canonical)
  $('.rrssb-twitter a').attr('href', 'https://twitter.com/intent/tweet?text=' + twitter + ' ' + canonical)

  countries = data.Sheet1.elements
  unique_countries = _.uniqBy(countries, function (e) {
    return e.score;
  });

  items_to_load = data.Sheet2.elements[0].Items
  var winning = get_list(highest, items_to_load, unique_countries, conc);
  var movinglist = document.getElementById('items');
  var sortable = new Sortable(movinglist, {
    draggable: '.item',
    animation: 150,
    onEnd: function(evt) {
      correct = $('.correct:visible').length;
      if (parseInt(correct) === parseInt(items_to_load)) {
        $('.conc').fadeIn()
      }
    },
    onUpdate: function(evt, winning) {
      // update attempls
      count = parseInt($('#count').text());
      console.log(count);
      count = count + 1
      $('#count').text(count)

      rank = parseInt(evt.item.dataset.rank)
      score = parseInt(evt.item.dataset.score)
      evRank = parseInt(evt.newIndex)
      if (rank === evRank) {
        $("ul#items li[data-score='" + score +"'] .correct").css('display', 'block');
      } else {
        $("ul#items li[data-score='" + score +"'] .correct").css('display', 'none');
      }
      // check the items that got rearranged while dragging
      allItems = $('ul#items').children();
      allItems.each(function(key, value) {
        rank = parseInt(value.dataset.rank)
        index = $(value).index()
        if (rank === index) {
           $('ul#items li[data-score="'+ value.dataset.score +'"] .correct').css('display', 'block')
        } else {
          $('ul#items li[data-score="'+ value.dataset.score +'"] .correct').hide()
        }
      })
    }
  })
  first = $('ul#items li').first();
  last = $('ul#items li').last();
  if (first[0].dataset.rank === '0') {
    moveDown(first)
  }
  if (last[0].dataset.rank === items_to_load) {
    moveUp(last)
  }
}

function moveUp($item) {
  $before = $item.prev();
  $item.insertBefore($before);
}

function moveDown($item) {
  $after = $item.next();
  $item.insertAfter($after);
}


function get_list(highest, num, countries, conc) {
  if (highest === 'yes') {
    rand = _.sampleSize(countries, num)
    sorted = _.sortBy(rand, [function(o) { return parseInt(o.score); }]).reverse();
    for (var x = 0; x < rand.length; x++) {
      key = _.findKey(sorted, ['country', rand[x].country])
      $("#items").append("<li class='item' data-rank='" +  key + "' data-score='" + rand[x].score + "'><span class='drag-handle'>☰</span>" + rand[x].country + "<span><span class='conc'> -  " + conc + ' ' + rand[x].score  + "</small></span><img class='correct' src='img/tick.png' /></li>")
    }
  } else {
    rand   = _.sampleSize(countries, num)
    sorted = _.sortBy(rand, [function(o) { return parseInt(o.score); }]);
    for (var x = 0; x < rand.length; x++) {
      key = _.findKey(sorted, ['country', rand[x].country])
      $("#items").append("<li class='item' data-rank='" +  key + "' data-score='" + rand[x].score + "'><span class='drag-handle'>☰</span>" + rand[x].country + "<span><span class='conc'> -  " + conc + ' ' + rand[x].score  + "</small></span><img class='correct' src='img/tick.png' /></li>")
    }
  }
}
