<script lang="ts">
  import '@vaadin/avatar';
  import '@vaadin/horizontal-layout';
  import '@vaadin/vertical-layout';
  import '@vaadin/details';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import {Contact} from '../../../../lib/vendors/google/Contacts'
  import {getRandomProfilePhoto} from '../../../../lib/common/RandomUtils/RandomProfilePhoto.ts'
  import { sentenceCase } from 'sentence-case'
  import JsonEditor from '../../components/JsonEditor.svelte'
  export let data: Contact[]
  let hLayout, vLayout
  $: hLayout?.setAttribute('theme', 'spacing margin')
  // $: vLayout?.setAttribute('theme', 'spacing margin')
</script>

<div>
  <VirtualList items={data.filter(c=>c.fullName||(c.firstName&&c.lastName))} let:item={contact} height='1000px'>
        <vaadin-horizontal-layout bind:this={hLayout}>
          <vaadin-avatar name={contact.fullName} img={contact.profilePictureUrl ? getRandomProfilePhoto() : ''} class='profile'></vaadin-avatar>
          <vaadin-vertical-layout>
            <b>{contact.fullName ?? [contact.firstName,contact.lastName].join(' ')}</b>
<!--            this is if you want to show the phone number/email address before details are expanded -->
            <!--{#if contact.phoneNumbers?.[0]?.phoneNumber}-->
            <!--  <a href={`tel:${contact.phoneNumbers?.[0]?.phoneNumber}`}>{contact.phoneNumbers?.[0]?.phoneNumber}</a>-->
            <!--  {:else if contact.emailAddresses?.[0]?.emailAddress}-->
            <!--  <a href={`mailto:${contact.emailAddresses?.[0]?.emailAddress}`}>{contact.emailAddresses?.[0]?.emailAddress}</a>-->
            <!--{/if}-->
                      <vaadin-details>
                        <div slot="summary">Contact information</div>
                        <vaadin-vertical-layout>
                          {#each contact.emailAddresses.filter(e=>e.emailAddress) ?? [] as emailObj}
                            <span><b>{sentenceCase(emailObj.label??'')||'Email'}</b>: <a href={`mailto:${emailObj.emailAddress}`}>{emailObj.emailAddress}</a></span>
                          {/each}
                          {#each contact.phoneNumbers.filter(e=>e.phoneNumber) ?? [] as phoneObj}
                            <span><b>{sentenceCase(phoneObj.label??'')||'Phone'}</b>: <a href={`tel:${phoneObj.phoneNumber}`}>{phoneObj.phoneNumber}</a></span>
                          {/each}
                        </vaadin-vertical-layout>
                      </vaadin-details>
          </vaadin-vertical-layout>
        </vaadin-horizontal-layout>
  </VirtualList>
</div>

<style>
  vaadin-avatar.profile{
      width: 100px;
      height: 100px;
  }
</style>