export default function YieldAndBounty() {
  return (
    <>
      <p>What is yield based marketing and how can bounties help you achieve your marketing goals? I'm glad you asked. Get ready, we're going to dive in and answer those questions!</p>
      <p>In SaaS marketing, the goal is to generate a high return on marketing effort and spend. Many ad platforms support this through return on ad spend (ROAS) bidding. Google calculates ROAS by summing your sales, dividing by spend, then multiplying by 100%:</p>
      <figure>
      <img src="/images/writing/chapterone/roas.png" alt="Google Ads ROAS formula" loading="lazy" />
      <figcaption>(<a href="https://support.google.com/google-ads/answer/6268637?hl=en" target="_blank" rel="noreferrer">https://support.google.com/google-ads/answer/6268637?hl=en</a>)</figcaption>
      </figure>
      <p>While this is easy to understand, it’s much harder to implement and actually generate marketing value. In this chapter, we’ll look at which steps we can take to build our marketing machine so we can generate a high return on ad spend (aka yield).</p>
      <p>At the beginning, the problem is volume or frequency of events. We need data to do fancy bidding like ROAS but when we're starting out, we don't have a large dataset and we can't generate it quickly enough. What's a SaaS marketer to do?</p>
      <p>Let’s say we have the following marketing funnel:</p>
      <ol>
      <li>Suspect (landing page visitors, etc.)</li>
      <li>MQL (marketing qualified lead)</li>
      <li>SAL (sales accepted lead)</li>
      <li>Customer (someone who can generate recurring revenue)</li>
      </ol>
      <p>We’ll have many more suspects than customers, sometimes as much as 100x. ROAS bidding assumes we have enough sales or customer data to pass back to an ad partner which will use this data to optimize our campaign.</p>
      <p>When we aren’t generating enough sales or customer events, we'll need to look higher up the funnel to a place where we generate enough volume of events. At minimum, we want at least 30 events per week. We can continue to move up our funnel until we find an event that generates enough volume.</p>
      <p>Now that we have selected the event, we’ll use the MQL event for this example, how do we calculate a return on MQL events? (This will be used as an approximation of events further down the funnel.)</p>
      <p>To do this, we’ll need to write out the funnel and the conversion rates from one step to the next. For our example, we can assume:</p>
      <figure>
      <img src="/images/writing/chapterone/spreadsheet.png" alt="Funnel conversion rates spreadsheet" loading="lazy" />
      <figcaption>(<a href="https://docs.google.com/spreadsheets/d/1WYv0ySyocdrn8W8Dbz0Kv4zzJb4UrZ4Coiul8sgY0nI/edit?usp=sharing" target="_blank" rel="noreferrer">via Google Sheets</a>)</figcaption>
      </figure>
      <p>For every suspect we generate, 20% of them become MQLs, 30% of MQLs become SALs, and 50% of SALs become paying customers. If our goal was to generate a new paying customer for every $500 in spend, we could set a bounty of $75 for our MQL event.</p>
      <p>In other words, for every $75 we spend, we want to generate 1 MQL. For every $500 we spend, we want to generate a new customer.</p>
      <figure><img src="/images/writing/chapterone/mql.jpg" alt="MQL bounty calculation" loading="lazy" /></figure>
      <p>Now that we have a bounty value, what are we going to do with it? We’re going to create our yield (or return) metric!</p>
      <p>Yield is calculated like ROAS, but we are using our bounty values instead of customer ARR or sales:</p>
      <p>Yield = ((# of conversions * bounty per conversion) / spend) * 100%</p>
      <figure><img src="/images/writing/chapterone/yield.jpg" alt="Yield formula" loading="lazy" /></figure>
      <p>Let’s say we spent $1,300 and generated 15 MQLs. How much yield did we generate?</p>
      <p>((15 * $75) / $1,300) * 100% = 87%</p>
      <p>I typically aim for yields that are 70% or higher, but yield targets are highly dependent on your industry and product.</p>
      <p>As we build volume and spend more, we’ll generate more data. Once we hit the 30 SAL conversions per week, we can repeat this entire process again and find our SAL yield. We can grow our data, spend, and repeat this process until we generate enough customers or purchases. At that point, yield and ROAS become the same metric.</p>
      <p>Feel free to reach out with any questions. I’d love to hear about your success with yield based marketing!</p>
    </>
  );
}
