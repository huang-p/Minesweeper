var areaRows = 6;
var areaCols = 6;
var mines = 4;

function clickCell(ri, ci) {
	if (ri < 0 || ri >= areaRows || ci < 0 || ci >= areaCols) {
		return;
	}
	var i = ri * areaCols + ci;
	$('.cell:eq(' + i + ')').click();
}
$(document).on('click', '.gaming .cell.close', function(e) {
	var $cell = $(this);
	$cell.removeClass('close');
	if ($cell.hasClass('mine')) {
		$('body').removeClass('gaming');
		$('#lost').show();
	} else if ($cell.children().text() == '') {
		var ri = +$cell.attr('data-ri');
		var ci = +$cell.attr('data-ci');
		clickCell(ri - 1, ci - 1);
		clickCell(ri - 1, ci);
		clickCell(ri - 1, ci + 1);
		clickCell(ri, ci - 1);
		clickCell(ri, ci + 1);
		clickCell(ri + 1, ci - 1);
		clickCell(ri + 1, ci);
		clickCell(ri + 1, ci + 1);
	}
}).on('mousedown', '.gaming .cell.close', function(e) {
	if (e.which != 1) {
		$(this).toggleClass('flag');
		if ($('.mine.flag').length == mines) {
			$('body').removeClass('gaming');
			$('#win').show();
		}
	}
});

$(window).on('contextmenu', function(e) {
	e.preventDefault();
}).on('keyup', function(e) {
	if (e.which == 17) {
		$('table').toggleClass('detecting');
	}
});

$(function() {
	var areaHtml = '';
	for (var i = 0; i < areaRows; i++) {
		var rowHtml = '';
		for (var j = 0; j < areaCols; j++) {
			rowHtml += '<td class="cell close no-mine" data-ri="' + i + '" data-ci="' + j + '"><span></span></td>';
		}
		areaHtml += '<tr>' + rowHtml + '</tr>';
	}
	$('tbody').append(areaHtml);
	var cells = areaRows * areaCols;

	function addNum(ri, ci) {
		if (ri < 0 || ri >= areaRows || ci < 0 || ci >= areaCols) {
			return;
		}
		var i = ri * areaCols + ci;
		var $num = $('.cell:eq(' + i + ').no-mine').children();
		if ($num.length > 0) {
			var num = +$num.text();
			$num.text(++num);
		}
	}
	for (var i = 0; i < mines; i++) {
		var j = Math.floor(Math.random() * 1000000) % (cells - i);
		var $cell = $('.no-mine:eq(' + j + ')').removeClass('no-mine').addClass('mine');
		$cell.children().text('');
		var ri = +$cell.attr('data-ri');
		var ci = +$cell.attr('data-ci');
		addNum(ri - 1, ci - 1);
		addNum(ri - 1, ci);
		addNum(ri - 1, ci + 1);
		addNum(ri, ci - 1);
		addNum(ri, ci + 1);
		addNum(ri + 1, ci - 1);
		addNum(ri + 1, ci);
		addNum(ri + 1, ci + 1);
	}
});
