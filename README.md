# Angular5TestTask
Front-End screen of on an SPA working an already up and runing [API](https://github.com/CocotteDodue/Angular5TestTask/blob/master/contents/CompletedAuditsApiEndpoints.PNG).

The task is to implements the controls of the "Completed Audits" section: Filter and Results only, as shown on following print screen.
![alt text](https://github.com/CocotteDodue/Angular5TestTask/blob/master/contents/CompletedAudits.PNG)

The challenge lies in being able to use an API that has not necessarily been designed to meet the front-end product components needs, in term of access to data, mapping and general behavior.
For instance, the data required to fill the available values for attribute filtering are provided with the first result search ran for the chosen attribute, with no specific value.

![alt text](https://github.com/CocotteDodue/Angular5TestTask/blob/01f893b8f6e066d189710bcb9ed5cfc505d524f6/contents/CompletedAuditsCategoryResults.PNG)


### What aspects of front-end development are covered in this Angular5 project:
* Component based approach:
  * Components are identified and created first with a very limited, single-responsability scope.
  * Reusability maximization in mind.
* Clean code:
  * Simplistic approach, keeping html, css, and ts files as consive, human readble.
  * Avoid redundancy.
  * use explicit naming & use of unique naming pattern.
  * Tests via spec files (in progress)
* Angular spcifics:
  * Dynamic component generation (ChildView).
  * HttpClient, & httpInterceptor.
  * Custom directive.
  * Controller Properties.
  * rsjx library:
    * EventEmitter.
    * Observable, with unsubscribe (takeUntil & Subject approach).
    * Subject & BehaviorSubject - to update the searchResults component when filter component is triggerring a new search.
  * AnuglarMaterial modules:
    * DatePicker.
    * TableDataSource & Paginator.
