/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Ensure that each feed in the allFeeds object has a URL 
         * defined and that the URL is not empty.
         */
        it('have a defined, non-empty URL', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toEqual('');
            });
        });

        /* Ensure that each feed in the allFeeds object has a name 
         * defined and that the name is not empty.
         */
        it('have a defined, non-empty name', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toEqual('');
            });
        });
    });


    /* Ensure the menu works as expected */
    describe('The Menu', function() {
        /* Ensure the menu element is hidden by default */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Ensure the menu is displayed when the menu icon is clicked,
          * and it returns hidden when the menu icon is clicked again.
          */
        it('toggles visibility when the menu icon is clicked', function() {

            /* Since we made sure that the menu is hidden by default,
             * after clicking on the menu icon, it should not be hidden anymore.
             */
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(false);
            
            /* Clicking again on the menu icon should hide the menu again */
            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Ensure the loadFeed() function works as expected */
    describe('Initial Entries', function() {
        /* Since loadFeed() is asynchronous, we use the beforeEach loop and 
         * the asynchronous done() function.
         */
        beforeEach(function(done) {
            /* remove any old feeds */
            $('.feed').empty();
            /* ensure loadFeed completes before running the test */
            loadFeed(0, done);
        });
        /* Ensure there is at least one .entry element within the 
         * .feed container.
         */
        it('contain at least one entry', function() {
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });

    /* Ensure that switching feed selection works as expected */
    describe('New Feed Selection', function() {
        /* Hold the feed entries before and after switching feed selection */
        let oldEntries;
        let newEntries;

        /* Since loadFeed() is asynchronous, we use the beforeEach loop and 
         * the asynchronous done() function.
         */
        beforeEach(function(done) {
            /* load the first feed */
            loadFeed(0);
            /* store the feed entries */
            oldEntries = $('.feed').children();
            /* switch to the next feed */  
            loadFeed(1, done);
        });

        /* Ensure that when a new feed is loaded by the loadFeed function 
         * the content actually changes.
         */
        it('changes the content', function(done) {
            
            /* Store the new feed entries */
            newEntries = $('.feed').children();

            for (let index in oldEntries) {

                /* Only compare feed entries when both the old entry and the
                 * new entry are defined.
                 */
                if (typeof oldEntries[index].href !== 'undefined' &&
                    typeof newEntries[index].href !== 'undefined') {

                    /* The old URL should be different from the new URL */
                    expect(oldEntries[index].href)
                            .not.toEqual(newEntries[index].href);

                    /* The old title should be different from the new title */
                    expect(oldEntries[index].innerText)
                            .not.toEqual(newEntries[index].innerText);
                }
            }
            done();
        });
    });
}());
