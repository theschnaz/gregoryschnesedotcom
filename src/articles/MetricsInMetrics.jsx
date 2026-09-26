export default function MetricsInMetrics() {
  return (
    <>
      <p>Growth marketing is all about leveraging our winners and minimizing our losers. In chapter one, we discussed <a href="/yields-and-bounties">yields, bounties, and how to calculate them</a>. In this chapter, we will explore how our conversion rate metrics are really just averages, the segments that make up our metrics, and how to improve marketing by applying our yield and bounties framework to our winning segments.</p>
      <p>Many companies track Very Important Key Performance Indicators (KPIs) or metrics. A user sign up, an app download, a trialing customer upgrading to a paid plan are all good examples.</p>
      <p>For this chapter, let's pretend we are Netflix and we want to improve our trial to paying customer rate which is currently 13.3%. When we look at this metric, what we're reallying saying is <strong>on average</strong> our trialing accounts convert to paying customers 13.3% of the time.</p>
      <p>While this may be true, when we take data and average it, we throw away a lot of the nuance in order to generate a clean and crisp datapoint.</p>
      <h2>How can we improve our trial to paying customer rate?</h2>
      <p>To start, let's assume our trial to paying customer rate is currently 13.3%. Since we know this metric is an average of all of our users, we can start to break it down into meaningful segments. What could be a meaningful segment for us? Maybe it's location, age, or customer interest category. For this post, let's go with customer interest category:</p>
      <figure><img src="/images/writing/chaptertwo/rate.png" alt="Trial to paid rate by customer interest category" loading="lazy" /></figure>
      <p>When we slice our data by customer interest category, we find:</p>
      <ul>
      <li>Horror fans convert from trial to paid at 12%</li>
      <li>Comedy fans convert from trial to paid at 25%</li>
      <li>Reality TV fans convert from trial to paid at 3%</li>
      </ul>
      <p>We clearly want direct our marketing efforts at comedy fans and avoid reality TV fans.</p>
      <h2>How can we target comedy fans?</h2>
      <p>We can use a tool, like <a href="https://segment.com/docs/spec/track/" target="_blank" rel="noreferrer">Segment</a>, and pass a trialing customer's most watched category as a datapoint when they upgrade to a paying customer:</p>
      <figure><img src="/images/writing/chaptertwo/segment.png" alt="Segment track call passing mostWatchedCategory" loading="lazy" /></figure>
      <p>Now that we are passing the type of customer (mostWatchedCategory) when they upgrade to a paying customer, we can send that data to an ad partner such as Google or Facebook. With these services, we can create an audience that looks like (a <a href="https://www.facebook.com/business/help/164749007013531" target="_blank" rel="noreferrer">lookalike audience</a>) our best converting segment (comedy).</p>
      <p>With our new comedy lookalike audience, we can target people who are similar to our best converting customers. We can even match the creative of our campaign to the type of incoming traffic. When people hit our landing page, we can show them funny shows and movies.</p>
      <p>If we want to get advanced, we can make audiences for our lower performing segments and exclude them (do not spend money advertising to these people.)</p>
      <p>By breaking our important metrics into meaningful segments, we can spend more money on high winners, less money on low performers, and we can match the creative to the type of people we target!</p>
      <p>Feel free to reach out with any questions. I’d love to hear about your success with segment based marketing!</p>
    </>
  );
}
