<script lang="ts">
  // Importing modules
  import moment from 'moment';
  import { onMount } from 'svelte';

  // Variables
  let interval;
  let timeElapsed: any;
  let date: moment.Moment;

  // onMount function
  onMount(() => {
    date = moment.unix(startDate);
    
    // Creating interval
    interval = setInterval(function () {
      // Updating timeElapsed variable
      const duration = moment.duration(moment().diff(date))
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
    }, 1000);

    return () => {
      // Clearing interval;
      console.log('clear interval');
      clearInterval(interval);
    };
  });

  // Exporting variables
  export let startDate: number;
</script>

<p>{ timeElapsed }</p>