import './dnd-term-dialog-link.js';
if (!window.mixins) {
  window.mixins = {};
}

mixins.TermLookupMixin = Polymer.dedupingMixin(
  (base) =>
    class extends AsyncActionsMixin(base) {
      constructor() {
        super();

        this.modelMaps = {
          spells: {
            searchProp: 'name',
            linkTextProp: 'name',
            headingProps: ['name'],
            subheadingProps: ['level', 'school'],
            descProps: [
              { label: 'Casting Time', prop: 'casting_time' },
              { label: 'Range', prop: 'range' },
              { label: 'Components', prop: 'components' },
              { label: 'Duration', prop: 'duration' },
              { label: 'Ritual', prop: 'ritual' },
              { label: 'Concentration', prop: 'concentration' },
              { label: 'Classes', prop: 'class' },
              'desc',
            ],
          },
        };
      }

      _modelToDialogElementTemplate(data, model) {
        if (data && data instanceof Object) {
          let modelMap = this.modelMaps[model];

          if (modelMap && modelMap instanceof Object) {
            let heading = `${modelMap.headingProps
                .map((prop) => {
                  return data[prop];
                })
                .join(' ')}
                           <small><i>${modelMap.subheadingProps
                             .map((prop) => {
                               return data[prop];
                             })
                             .join(', ')}</i></small>`,
              body = '';

            for (let prop of modelMap.descProps) {
              if (prop instanceof Object) {
                if (data[prop.prop]) {
                  body += `<div><strong>${prop.label}</strong>: <span>${
                    data[prop.prop]
                  }</span></div>`;
                }
              } else {
                body += '<p>' + data[prop] + '</p>';
              }
            }

            let dialogLinkEl = document.createElement('dnd-term-dialog-link');
            dialogLinkEl.heading = heading;
            dialogLinkEl.body = body;
            dialogLinkEl.linkText = data[modelMap.linkTextProp];
            return dialogLinkEl;
          } else {
            console.error(
              'Missing model to dialog mapping for model: ' + modelName
            );
            return null;
          }
        } else {
          // No term was found so build the link with noREsultText
          let dialogLinkEl = document.createElement('dnd-term-dialog-link');
          dialogLinkEl.noResultText = data;

          return dialogLinkEl;
        }
      }

      _termLookupFromAnchorElements(wrapperElement) {
        let anchorElements = wrapperElement.querySelectorAll('a');

        for (let anchorEl of anchorElements) {
          let term = anchorEl.textContent,
            model = anchorEl.getAttribute('href');

          this._queryTerms(term, model).then((termsData) => {
            for (let termData of termsData) {
              let dialogElement = this._modelToDialogElementTemplate(
                termData,
                model
              );
              if (dialogElement) {
                anchorEl.replaceWith(dialogElement);
              }
            }
          });
        }
      }

      _queryTerms(terms, model) {
        let termPromises = [];

        terms = terms instanceof Array ? terms : [terms];

        for (let term of terms) {
          let findObj = {};

          if (this.modelMaps[model]) {
            findObj[this.modelMaps[model].searchProp] = {
              $regex: new RegExp('^' + term + '$', 'i'),
            };

            termPromises.push(
              new Promise((resolve, reject) => {
                this.dispatch('load', model, findObj, (termData) => {
                  if (termData instanceof Array) {
                    if (termData.length === 0) {
                      // No result
                      resolve(term);
                    } else {
                      resolve(termData[0]);
                    }
                  } else {
                    resolve(termData);
                  }
                });
              })
            );
          } else {
            termPromises.push(Promise.reject());
          }
        }
        return Promise.all(termPromises);
      }
    }
);
