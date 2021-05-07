/**
 * http://usejsdoc.org/
 */

if ( !window.PaymentFrameManager ) {
    window.PaymentFrameManager = {
        hotelCreditCards:["MASTERCARD","VISA"],
        translations:null,
        locale:null,
        child:null,

        getCardTypeList: function( payload ) {
            if ($fb._state.app.data.properties && $fb._state.app.data.properties[$fb._state.quicksearch.property] && $fb._state.app.data.properties[$fb._state.quicksearch.property].configuration && $fb._state.app.data.properties[$fb._state.quicksearch.property].configuration.creditCards) {
                PaymentFrameManager.hotelCreditCards = $fb._state.app.data.properties[$fb._state.quicksearch.property].configuration.creditCards;
                PaymentFrameManager.hotelCreditCards = JSON.parse(JSON.stringify( PaymentFrameManager.hotelCreditCards).replace("EUROCARD/MASTERCARD","").replace(",,",","))
            }
            return PaymentFrameManager.hotelCreditCards;
        },
        getTranslations: function( payload ) {
            PaymentFrameManager.translations = $.fb('crs-locale-configure',{k:'translations'});
            PaymentFrameManager.locale = $.fb('crs-utils-configure',{k:'locale'});
            PaymentFrameManager.translations[PaymentFrameManager.locale]["months"] = $.fb('crs-locale-culture').calendar.months;
            PaymentFrameManager.translations[PaymentFrameManager.locale]["onlyLatinChars"] = $fb._state.app.data.onlyLatinChars;
            return PaymentFrameManager.translations[PaymentFrameManager.locale];
        },
        set: function( payload ) {
            $("[name=" + payload.name + "]").val(payload.value);
            $.fb('crs-verifyHeight-dataCollectAndGuarantee');
        },
        get: function( payload ) {
            var result = {};
            switch (payload.key) {
            case 'cardTypeList':
                var data = PaymentFrameManager.getCardTypeList(payload);
                result[payload.key] = data;
                break;
            case 'translations':
                var data = PaymentFrameManager.getTranslations(payload);
                result[payload.key] = data;
                break;
            }

            return result;
        },
        getTemplate: function( payload ) {
            var result = {};
            var t = document.querySelector('#' + payload.key + '');
            var content = '<template id="' + payload.key + '" >' + t.innerHTML
                    + '</template>';
            result[payload.key] = encodeURIComponent(content);
            return result;
        },
        validateChildForm: function () {
            if ( PaymentFrameManager.child !== null ) {
                PaymentFrameManager.child.send({ method: "validateForm" });
            }
        },
        init: function(child) {
            PaymentFrameManager.child = child;
            PaymentFrameManager.child.receive(function (payload, event) {
                var result = {};
                switch (payload.method) {
                case 'set':
                    return PaymentFrameManager.set(payload);
                    break;
                case 'get':
                    return PaymentFrameManager.get(payload);
                    break;
                case 'getTemplate':
                    return PaymentFrameManager.getTemplate(payload);
                    break;
                }
            });
        }
    }
}