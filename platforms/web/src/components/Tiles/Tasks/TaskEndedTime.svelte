<script lang="ts">
  // Importing modules
  import { onMount } from 'svelte';
  import type { ITaskSessionObject } from '$shared/types';
  import moment from 'moment';

  let timeElapsed: string = '...';
  let secondsElapsed = 0;

  // update timestamp function
  function updateTimestamp(sessions: Array<Pick<ITaskSessionObject, '_id' | 'startDate' | 'endDate'>>) {
    secondsElapsed = 0;
    
    // Looping through all ended sessions
    sessions.forEach((session) => {
      if (session.endDate - session.startDate > 0)
        secondsElapsed += session.endDate - session.startDate;
    });

    // Generating duration
    const duration = moment.duration({
      seconds: secondsElapsed
    });
    
    const time = [];

    // Checkers
    // - days
    if (duration.days()) {
      time.push(`${duration.days()} д.`);
    };

    // - hours
    if (duration.hours()) {
      time.push(`${duration.hours()} ч.`);
    };

    // - minutes
    if (duration.minutes()) {
      time.push(`${duration.minutes()} м.`);
    };

    // - seconds
    if (duration.seconds()) {
      time.push(`${duration.seconds()} с.`);
    };

    timeElapsed = time.join(' ');
  };

  // onMount event
  $: updateTimestamp(sessions);

  // Exporting variables
  export let sessions: Array<Pick<ITaskSessionObject, '_id' | 'startDate' | 'endDate'>>;
</script>

<p>{ timeElapsed }</p>