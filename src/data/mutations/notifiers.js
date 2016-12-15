/**
 * Created by jonirrings on 16/12/15.
 */
const notifiers = [];

export function notifyChange(topic, data) {
  // Delay the change notification to avoid the subscription update hitting the
  // client before the mutation response.
  setTimeout(() => {
    notifiers.forEach(notifier => notifier({ topic, data }));
  }, 100);
}

export function addNotifier(cb) {
  notifiers.push(cb);

  return () => {
    const index = notifiers.indexOf(cb);
    if (index !== -1) {
      notifiers.splice(index, 1);
    }
  };
}
