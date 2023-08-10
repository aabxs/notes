<script>
import { RouterLink, RouterView } from "vue-router";
</script>
<script setup>
defineProps({
  width: {
    type: String,
  },
});
</script>
<template>
  <div>
    <div class="center p-5">
      <div class="container-fluid">
        <div class="container">
          <h1>Terms</h1>
          <p>
            Terms of Service Please read these Terms of Service ("Terms")
            carefully before using StudentSpark (the "Service") provided by
            StudentSpark Inc. ("we," "us," or "our"). These Terms govern your
            access to and use of the Service. By accessing or using the Service,
            you agree to be bound by these Terms. If you do not agree with any
            part of these Terms, you may not use the Service.
            <br />
            <br />1. Account Registration and Usage <br />1.1. Eligibility: To
            use the Service, you must be at least 13 years old. If you are under
            the age of 18, you represent that you have obtained the consent of
            your parent or legal guardian to use the Service. <br />1.2. Account
            Creation: When creating an account, you must provide accurate and
            complete information. You are responsible for maintaining the
            confidentiality of your account and password and for all activities
            that occur under your account. <br />1.3. Acceptable Use: You agree
            to use the Service only for lawful purposes and in compliance with
            these Terms. You shall not use the Service to engage in any illegal,
            harmful, or unauthorized activities, including but not limited to:
            <br />* Uploading, posting, transmitting, or sharing any content
            that is unlawful, harmful, defamatory, abusive, obscene, or
            otherwise objectionable. <br />* Engaging in any activity that may
            disrupt or interfere with the Service or its servers. <br />*
            Impersonating any person or entity or falsely representing your
            affiliation with any person or entity. <br />* Violating any
            applicable laws or regulations. <br />2. User Content <br />2.1.
            User Responsibility: You are solely responsible for the content you
            create, upload, transmit, or otherwise make available through the
            Service ("User Content"). You retain all ownership rights to your
            User Content, but by using the Service, you grant us a
            non-exclusive, worldwide, royalty-free license to use, reproduce,
            modify, adapt, publish, translate, distribute, and display your User
            Content for the purpose of providing and improving the Service.
            <br />2.2. Prohibited Content: You shall not upload, post, or share
            any User Content that: <br />* Infringes upon the intellectual
            property rights or other proprietary rights of any party. <br />*
            Contains viruses, malware, or other harmful code. <br />* Is false,
            misleading, or deceptive. <br />* Violates any applicable laws or
            regulations. <br />2.3. Content Removal: We reserve the right to
            remove any User Content that violates these Terms or is otherwise
            objectionable, without prior notice. <br />3. Intellectual Property
            Rights <br />3.1. Service Ownership: The Service and its original
            content, features, and functionality are and will remain the
            exclusive property of StudentSpark Inc. The Service is protected by
            copyright, trademark, and other laws of both the United States and
            foreign countries. <br />3.2. Trademarks: The StudentSpark name,
            logo, and any other trademarks, service marks, graphics, and logos
            used in connection with the Service are trademarks or registered
            trademarks of StudentSpark Inc. Other trademarks, service marks,
            graphics, and logos used in connection with the Service may be the
            trademarks of their respective owners. Your use of the Service does
            not grant you any right or license to reproduce or otherwise use any
            of these trademarks. <br />4. Privacy <br />4.1. Privacy Policy: Our
            Privacy Policy governs the collection, use, and disclosure of your
            personal information when you use the Service. By using the Service,
            you consent to our collection, use, and disclosure of your personal
            information as described in the Privacy Policy. <br />5. Disclaimer
            of Warranties <br />5.1. The Service is provided on an "as is" and
            "as available" basis. We make no warranties, whether express or
            implied, regarding the Service's reliability, availability,
            accuracy, or suitability for your purposes. <br />6. Limitation of
            Liability <br />6.1. To the maximum extent permitted by applicable
            law, we shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, or any loss of profits or
            revenue, whether incurred directly or indirectly, or any loss of
            data, use, goodwill, or other intangible losses, resulting from your
            access to or use of the Service. <br />7. Modifications and
            Termination <br />7.1. We reserve the right to modify or discontinue
            the Service, in whole or in part, at any time without prior notice.
            We shall not be liable to you or any third party for any
            modification, suspension, or discontinuation of the Service.
            <br />7.2. We may terminate or suspend your account immediately,
            without prior notice or liability, for any reason whatsoever,
            including but not limited to a breach of these Terms. <br />8.
            Governing Law and Jurisdiction <br />8.1. These Terms shall be
            governed by and construed in accordance with the laws of England and
            Wales. Any disputes arising out of or relating to these Terms or the
            Service shall be resolved exclusively in the courts of England and
            Wales. Please note that it is always recommended to consult with a
            legal professional to ensure that your Terms of Service align with
            the specific legal requirements and regulations of your
            jurisdiction. <br />9. Entire Agreement <br />9.1. These Terms
            constitute the entire agreement between you and StudentSpark Inc.
            regarding your use of the Service and supersede all prior and
            contemporaneous agreements, proposals, or representations, whether
            written or oral. By using StudentSpark, you acknowledge that you
            have read, understood, and agreed to these Terms of Service. If you
            have any questions or concerns about these Terms, please contact us
            at studentspark@stup.id
          </p>
        </div>
      </div>
      <div v-if="error">
        <Notification :message="message" :success="false" />
      </div>
      <div v-if="success">
        <Notification :message="message" :success="true" />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center pb-5">
      <div>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/"
        >
          home
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/about"
        >
          about
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/contact"
        >
          contact
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: #181c1c !important;
  padding: 7.5px 15px;
  font-size: 1.15em;
  border-radius: 5px 5px;
}

.center {
  min-height: 90vh;
  display: flex;
  align-items: center;
}
</style>
