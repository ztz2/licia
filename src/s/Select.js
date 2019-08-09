/* Simple wrapper of querySelectorAll to make dom selection easier.
 *
 * ### constructor
 *
 * |Name    |Type  |Desc               |
 * |--------|------|-------------------|
 * |selector|string|Dom selector string|
 *
 * ### find
 *
 * Get desdendants of current matched elements.
 *
 * |Name    |Type  |Desc               |
 * |--------|------|-------------------|
 * |selector|string|Dom selector string|
 *
 * ### each
 *
 * Iterate over matched elements.
 *
 * |Name|Type    |Desc                                |
 * |----|--------|------------------------------------|
 * |fn  |function|Function to execute for each element|
 */

/* example
 * var $test = new Select('#test');
 * $test.find('.test').each(function (idx, element) {
 *     // Manipulate dom nodes
 * });
 */

/* module
 * env: browser
 * test: browser
 */

/* typescript
 * export declare class Select {
 *     constructor(selector: string | Element);
 *     find(selector: string): Select;
 *     each(fn: Function): Select;
 * }
 */

_('Class isStr each');

exports = Class({
    className: 'Select',
    initialize: function(selector) {
        this.length = 0;

        if (!selector) return this;

        if (isStr(selector)) return rootSelect.find(selector);

        if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
        }
    },
    find: function(selector) {
        var ret = new exports();

        this.each(function() {
            mergeArr(ret, this.querySelectorAll(selector));
        });

        return ret;
    },
    each: function(fn) {
        each(this, function(element, idx) {
            fn.call(element, idx, element);
        });

        return this;
    }
});

var rootSelect = new exports(document);

function mergeArr(first, second) {
    var len = second.length,
        i = first.length;

    for (var j = 0; j < len; j++) first[i++] = second[j];

    first.length = i;

    return first;
}
