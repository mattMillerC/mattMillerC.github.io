"use strict";

window.onload = () => {
    let total = 0,
        historyIndex = -1;

    let diceField = mdc.textField.MDCTextField.attachTo(document.querySelector(".mdc-text-field"));
    mdc.notchedOutline.MDCNotchedOutline.attachTo(document.querySelector(".mdc-notched-outline"));

    let outputRollResult = (roll, name) => {
        let rollResult = droll.roll(roll.replace(/\s/g, ""));
        if (rollResult) {
            $("div#output").prepend(
                `<div>
                    <em><a class='roll' data-roll='${roll}'>${roll}</a></em> rolled for <strong>${rollResult.total}</strong>${rollResult.rolls.length > 1 ? `<br>(${rollResult.rolls.join(", ")})` : ''}
                </div>`
            ).show();
            total += rollResult.total;
            $('#total').html(total)
            $(".roll-total-wrap").show();
            $(".roll-clear").show();
            diceField.value = "";
        } else {
            $(".dice-field-container .mdc-text-field").addClass("error");
        }
    };

    $(".roll-clear").click(e => {
        e.preventDefault();

        historyIndex = -1;
        $("div#output").empty();
        $(".roll-total-wrap").hide();
        $(".roll-clear").hide();
        total = 0;
    });

    $(".roll-submit").click(e => {
        e.preventDefault();

        historyIndex = -1;
        $(".dice-field-container .mdc-text-field").removeClass("error");
        let roll = $(".roll-field").val();
        if (roll) {
            outputRollResult(roll);
        } else {
            $(".dice-field-container .mdc-text-field").addClass("error");
        }
    });

    $(".roll-field").on('keydown', (e) => {
        let keyCode = e.keyCode || e.which,
            historyCount = $('#output > div').length;

        // up
        if (keyCode === 38) {
            e.preventDefault();
            if (historyIndex + 1 < historyCount) {
                historyIndex ++;
                diceField.value = $(`#output div:eq(${historyIndex}) a.roll`).data('roll');
            }

        // down
        } else if (keyCode === 40) {
            e.preventDefault();
            if (historyIndex - 1 > -1) {
                historyIndex --;
                diceField.value = $(`#output div:eq(${historyIndex}) a.roll`).data("roll");
            }

        // enter
        } else if (keyCode === 13) {
            e.preventDefault();
            $(".roll-submit").click();
        }
    });

    $(document).on('click', ".roll[data-roll]", e => {
        e.preventDefault();

        let roll = $(e.target)
            .closest(".roll")
            .data("roll");
        if (roll) {
            outputRollResult(roll);
        }
    });
};