# Solace Craft Demo

Completed by [Matthew Wrather](https://www.linkedin.com/in/mwrather) <[matthew.wrather@gmail.com](mailto:matthew.wrather@gmail.com)>

## Intro Notes

For this demo project, to demonstrate that I am a [`master of my craft`](https://jobs.ashbyhq.com/solace/019c9ce5-4053-4f5b-a639-d75a9e862c56?departmentId=64964734-4f1b-46d6-9828-1dd5d8eea077), I started by buildling a backlog based on the goals &mdash;

- Fix bugs/anti-patterns
- Improve UI
- Improve the backend

&mdash; and then to knock out as many "tickets" as time allowed. In general I prefer changesets that are as small as possible, so I am committing as often as I have an atomic, revertable unit of work which solves a problem.

In line with the instructions, I'm maintaining a separation between FE/BE -- i.e., I assume that the data belong to a separately-deployed API service than the UI.

Also, for what it's worth, I didn't use any AI code completion, or do anything like ask an LLM, "Build a backlog for me and suggest improvements." I think Cursor, Co-Pilot and similar are great tools, and they can definitley speed up your work in a lot of situations, but (a) the point of this is to demonstrate how I think, and (b) there are [drawbacks and antipatterns](https://www.thoughtworks.com/radar) which have already emerged in LLM-assisted coding and it's worthwhile to do things by hand sometimes.

## A note about "Pull Requests"

On Github, when you "stack" PRs (i.e., when you make a PR whose commits are children of an unmerged PR), the diffs show both the parent and the child PRs. In a real world applcaiton, pretty much every commit on this branch _should_ have been its own PR, but it's better to click through each commit individually to see the changesets etc.

## Backlog

- MW-1 Fix `npm audit` flags
- MW-2 Install prettier
- MW-3 Improve data fetching
- MW-4 Implement server-side filtering
- MW-5 Improve Design
- MW-6 Implement Pagination (hook up database)

## What Might Have Been

**MW-7 Normalize Db & Update Schema**
For what it's worth, to achieve normalization, the degrees, specialties, and maybe the cities should be in their own tables and JOINed to the advocates when queried. Probably worth to audit the requirements and index some of the fileds -- come to think of it, it's worth it to index _many_ of the fields, since write performance is not an issue with this kind of app and read performance is everything. All those JOINs are a performance hit (though likekly not as bad as searching within the JSONB), so speaking of performance, maybe consider:

**MW-8 Implement New Search Backend**
I'm not sure that Postgres is the right persistence layer for this application. Without full requirements and all their details and special circumstances it's hard to say for sure, but I wonder if it wouldn't make sense to use something like Elastic as a separate service to power search. So the approach would probably be to spike on the requirements and then nominate candidate data stores which lend themselves to this particular kind of search.

**MW-9 Implement Faceted Search**
Thinking about a database that contains 10ks or 100ks of rows, my large-scale goal was to move as little data over the wire as possible, and also to reduce load on the backend with each query. This was done on the FE with debouncing (given half a day to work on it I might have another look at how the debouncing is implemented, and maybe wrap that up in a custom hook, but as it is it does what it's supposed to do) and using React Query which can cache results based on the query key. On the backend, I improved efficiency with MW-4, which performed the filtering on the server side (which moved less data over the wire than returning the entire result set and filtering client-side), and with MW-6, which used pagination to query and return a smaller result set. Another step in this direction would be faceted search -- with a dropdown of specialties, for example, or a dropdown of degrees (though I'd have questions about the product strategy in searching for an MSW vs a PhD counselor, because do people really care?).

**MW-10 Testing**
I didn't put any tests in. There wasn't really anything atomic enough to unit test -- (a) there's not really any business logic, since this app is just filters a list, and (b) when you're using a component library, it's a waste of time to snapshot test your `<Input />` element; you're relying on the library for the guarantees that testing would give you. There is probably some utility in an E2E test that uses dummy data to make sure that the app displays what you expect when you type `J`, `JO`, `JOH`, and `JOHN`, but that would invovle some decisions around mocking and test framework which were out of scope in a project meant to take a couple hours.

**MW-11 Deployment**
Completely punted on this one. This app needs a build script, CI to run the tests, and CD to do deployments. For what it's worth, for a new app, I strongly advocate creating a minimal service with "hello world" functionality and pushing it _ALL THE WAY_ to production, because there's nothing worse than having a working application you need to deploy and trying to debug Github Actions at 11:59pm on a Friday.

## Commit Messages

These would have been the PR descriptions; I'm including them here for convenience.

6ba2895 [**MW-1 fix `npm audit` warnings**](https://github.com/mwrather/solace-demo/commit/6ba2895169e6cd82b04a9b4584906758e1087d21)

```
In the node ecosystem, it's generally important to stay on top of
security-related patch versions -- important enough to take a couple
minutes out of this exercise to run an automated update.

*Deployment Note* This commit spefices the required version of node to
the active LTS version.
```

e550df4 [**MW-2 Insall prettier**](https://github.com/mwrather/solace-demo/commit/e550df4b5a60020639423855cfc57736220ade25)

```
Another quick fix that's worth a minute or two is installing standard
code formatting -- with a lot of people working on a codebase it's worth
it to automate this.
```

3691041 [**MW-3 Improve Data Fetching**](https://github.com/mwrather/solace-demo/commit/36910415a4aa630b52b20f475785404ff6824cc9)

```
Fetching data in a call to `useEffect()` is an anti-pattern in React;
the problems with it, including the possiblity of race conditions and
stale closures leaving the sarch results out of sync with the search
term, are too numerous to list here.

For client-side React apps (ones bootstrapped with Vite, for example),
the canonical pattern is to use TanStack Query (formerly React Query) to
synchronize server state with client state.

This commit introduces a number of abstractions. They are not strictly
speaking necessary (or even desirable) in an app this small -- too many
abstractions introduced too early on makes a codebase harder to debug.
But for sufficiently large apps, colocating data fetching concerns and
api client concerns in separate modules is a useful pattern; I've
introduced it here because this is notionally a large app.
```

936ed3c [**MW-4 Implement server-side filtering**](https://github.com/mwrather/solace-demo/commit/936ed3c40d3a472cf35ffd987bcdac7d7859f7f9)

```
Filtering the entire result set on the client has some benefits -- it
makes the UI more responsive when filtered because there isn't a network
request to the API -- *as long as the result set is small*. If there are
orders of magnitude more advocates than in the dummy data, not only will
the filtering performance degrade, but necessary improvements like
pagination will be harder to implement.

The particular filtering technique concatenates all an advocate's data
into a single string (using pipes `||` to prevent accidental matches
that span words) and tests that long string once against the search term
(all normalized to lowercase). This struck me as preferable to a lot of
different checks.
```

974b0af [**MW-5 Revise Design**](https://github.com/mwrather/solace-demo/commit/974b0afe1da474b22b09c00e9e2e4a37c21e5ecf)

```
Revised the design by improving the aesthetics a bit, creating
consistency and sensible, accessible defaults with the `shadcn/ui`
component library, and combining and hiding information which is not
relevant until a user has expressed interest in a particular advocate.
```

378d811 [**MW-6 Implement Pagination**](https://github.com/mwrather/solace-demo/commit/378d811bbb62b5b6d49fc8ba06b3e93b97375a27)

```
This commit introduces a real database (scaffolded out as described in
`README.md`), and implements pagination as a way of improving
performance (by limiting the result sent queried and sent over the
wire).

**Deployment Notes**: With the introduction of a DB, the deployment gets
more complicated; we need to make sure that migrations run as part of
the CD process.
```
