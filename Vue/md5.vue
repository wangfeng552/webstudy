<template>
  <div class="lingshu-auth" style="">
    <!-------------->
    <!-- 身份选择 -->
    <!-------------->
    <div v-show="selectTypeShow" class="lingshu-modal">
      <div class="select-type">
        <img class="close" src="@/assets/img/icon/close.svg" @click="handleCancel" />
        <div class="type-title">{{ $t('SelectAccountIdentityType') }}</div>
        <div class="three-type-wrap">
          <div class="type" :class="{ selected: developTypeTemp === 'oem' }" @click="handleOEMTIER">
            <img class="type-image" src="@/assets/img/icon/OEM&Tier1.svg" />
            <div>
              <div class="type-name lingshu-button-light-type">{{ $t('oem') }}</div>
            </div>
            <div class="type-description">{{ $t('OEMTIER_Description') }}</div>
          </div>
          <div
            class="type"
            :class="{ selected: developTypeTemp === 'ent' }"
            @click="handleTechnologyCompany"
          >
            <img class="type-image" src="@/assets/img/icon/technologycompany.svg" />
            <div>
              <div class="type-name lingshu-button-light-type">{{ $t('ent') }}</div>
            </div>
            <div class="type-description">{{ $t('TechnologyCompany_Description') }}</div>
          </div>
          <div
            class="type"
            :class="{ selected: developTypeTemp === 'individual' }"
            @click="handleGeekDeveloper"
          >
            <img class="type-image" src="@/assets/img/icon/developer.svg" />
            <div>
              <div class="type-name lingshu-button-light-type">{{ $t('individual') }}</div>
            </div>
            <div class="type-description">{{ $t('GeekDeveloper_Description') }}</div>
          </div>
        </div>
        <div style="display: flex; margin-top: 37px">
          <div class="lingshu-primary-button" style="margin-left: 255px" @click="handleOk">
            {{ $t('Confirm') }}
          </div>
          <div class="lingshu-button" style="margin-left: 30px" @click="handleCancel">
            {{ $t('Cancel') }}
          </div>
        </div>
      </div>
    </div>
    <!-------------->
    <!-- 查看大图 -->
    <!-------------->
    <div v-show="displaySamplePicture" class="lingshu-modal">
      <div class="big-picture">
        <img class="close" src="@/assets/img/icon/close.svg" @click="handleBigPictureCancel" />
        <!-- <img class="sample-picture" :src="currentSamplePicture" /> -->
        <div style="height: 74px"></div>
        <div
          class="big-picture-image"
          :style="{ backgroundImage: 'url(' + currentSamplePicture + ')' }"
          style="width: 242px; height: 152px; margin: 0 auto"
        ></div>
      </div>
    </div>

    <a-breadcrumb style="margin-bottom: 10px">
      <a-breadcrumb-item
        ><a @click="goAccountAuthentication" style="cursor: pointer">{{
          $t('AccountAuthentication')
        }}</a>
      </a-breadcrumb-item>
      <a-breadcrumb-item style="color: #3371ff">{{
        $t('IdentityAuthentication')
      }}</a-breadcrumb-item>
    </a-breadcrumb>
    <!-------------->
    <!-- 身份认证 -->
    <!-------------->
    <div class="lingshu-card">
      <div class="title">
        {{ $t('IdentityAuthentication') }}
      </div>
      <div style="display: flex; margin-top: 20px">
        <img
          class="type-image"
          v-if="developType === 'individual'"
          src="@/assets/img/icon/developer.svg"
        />
        <img
          class="type-image"
          v-else-if="developType === 'ent'"
          src="@/assets/img/icon/technologycompany.svg"
        />
        <img
          class="type-image"
          v-else-if="developType === 'oem'"
          src="@/assets/img/icon/OEM&Tier1.svg"
        />

        <div style="margin-left: 10px; margin-top: 12px">
          <div>
            <div class="type-name" v-if="developType === 'individual'">
              {{ $t('individual') }}
            </div>
            <div class="type-name" v-else-if="developType === 'ent'">
              {{ $t('ent') }}
            </div>
            <div class="type-name" v-else-if="developType === 'oem'">{{ $t('oem') }}</div>
          </div>
          <div class="modify-identity-description">{{ $t('ModifyIdentityDescription') }}</div>
        </div>
        <a
          @click="handleModifyIdentity"
          class="lingshu-button-light"
          style="margin-top: 5px; margin-right: 20px; margin-left: auto; line-height: 21px"
          >{{ $t('ModifyIdentity') }}</a
        >
      </div>
    </div>

    <!-------------->
    <!-- 个人认证 -->
    <!-------------->

    <div v-if="developType === 'individual'">
      <div class="lingshu-card" style="margin-top: 20px">
        <div class="title">{{ $t('AuthenticationInformation') }}</div>

        <!-- 真实姓名 -->

        <div class="lingshu-item" style="margin-top: 20px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('real_name') }}</div>
          <input
            :class="{ 'lingshu-checkfalse': this.personalInfo.real_name_help }"
            class="lingshu-input"
            v-model="personalCommit.real_name"
            :placeholder="$t('NameHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ this.personalInfo.real_name_help }}</div>

        <!-- 身份证号 -->

        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('id_number') }}</div>
          <input
            :class="{ 'lingshu-checkfalse': this.personalInfo.id_number_help }"
            class="lingshu-input"
            v-model="personalCommit.id_number"
            :placeholder="$t('IdentityNumberHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ this.personalInfo.id_number_help }}</div>

        <!-- 个人上传图片1 -->
        <div style="height: 10px"></div>
        <div class="upload-outer" style="display: flex; align-items: center; margin-left: 122px">
          <div class="upload-wrap">
            <a-upload
              :accept="accept"
              class="upload-left"
              @change="handleChangePerson1"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              action="personPicUuid-pic1"
              :customRequest="customRequest"
            >
              <div
                class="upload-left-inner left-picture"
                :style="{ backgroundImage: 'url(' + personalPic1Left + ')' }"
              >
                <div :class="{ 'lingshu-hide': personalPic1Left }">
                  <div class="upload-left-inner-plus-prev"></div>
                  <div class="upload-left-inner-plus">+</div>
                  <div class="upload-left-inner-plus-next"></div>
                  <div class="upload-left-inner-text">{{ $t('personPic1') }}</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-right" @click="handleSample1" style="margin-left: 10px">
              <!-- <img :src="personPic1" /> -->
              <div
                class="right-picture"
                :style="{ backgroundImage: 'url(' + personPic1 + ')' }"
              ></div>

              <a class="upload-right-text">{{ $t('samplePicture') }}</a>
            </div>
          </div>
          <div class="lingshu-image-helper">{{ personalPic1Help }}</div>
        </div>

        <!-- 个人上传图片2 -->
        <div style="height: 20px"></div>
        <div class="upload-outer" style="display: flex; align-items: center; margin-left: 122px">
          <div class="upload-wrap">
            <a-upload
              :accept="accept"
              class="upload-left"
              @change="handleChangePerson2"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              action="personPicUuid-pic2"
              :customRequest="customRequest"
            >
              <div
                class="upload-left-inner left-picture"
                :style="{ backgroundImage: 'url(' + personalPic2Left + ')' }"
              >
                <div :class="{ 'lingshu-hide': personalPic2Left }">
                  <div class="upload-left-inner-plus-prev"></div>
                  <div class="upload-left-inner-plus">+</div>
                  <div class="upload-left-inner-plus-next"></div>
                  <div class="upload-left-inner-text">{{ $t('personPic2') }}</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-right" @click="handleSample2" style="margin-left: 10px">
              <!-- <img :src="personPic1" /> -->
              <div
                class="right-picture"
                :style="{ backgroundImage: 'url(' + personPic2 + ')' }"
              ></div>

              <a class="upload-right-text">{{ $t('samplePicture') }}</a>
            </div>
          </div>
          <div class="lingshu-image-helper">{{ personalPic2Help }}</div>
        </div>

        <!-- 个人上传图片3 -->
        <div style="height: 20px"></div>
        <div class="upload-outer" style="display: flex; align-items: center; margin-left: 122px">
          <div class="upload-wrap">
            <a-upload
              :accept="accept"
              class="upload-left"
              @change="handleChangePerson3"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              action="personPicUuid-pic3"
              :customRequest="customRequest"
            >
              <div
                class="upload-left-inner left-picture"
                :style="{ backgroundImage: 'url(' + personalPic3Left + ')' }"
              >
                <div :class="{ 'lingshu-hide': personalPic3Left }">
                  <div class="upload-left-inner-plus-prev"></div>
                  <div class="upload-left-inner-plus">+</div>
                  <div class="upload-left-inner-plus-next"></div>
                  <div class="upload-left-inner-text">{{ $t('personPic3') }}</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-right" @click="handleSample3" style="margin-left: 10px">
              <!-- <img :src="personPic1" /> -->
              <div
                class="right-picture"
                :style="{ backgroundImage: 'url(' + personPic3 + ')' }"
              ></div>

              <a class="upload-right-text">{{ $t('samplePicture') }}</a>
            </div>
          </div>
          <div class="lingshu-image-helper">{{ personalPic3Help }}</div>
        </div>

        <!-- 图片大小说明 -->
        <div class="picture-format-description">{{ $t('PictureFormatDescription') }}</div>

        <!-- 个人公司所在地 -->
        <div class="lingshu-item" style="margin-top: 30px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('CompanyLocation') }}</div>
          <a-select
            :class="{ 'lingshu-checkfalse': personalInfo.location_help }"
            v-model="personalInfo.province"
            @change="handlePersonalProvinceChange"
            style="width: 190px"
          >
            <a-select-option
              v-for="province in personalInfo.provinceData"
              :key="province.id"
              :value="province.name"
            >
              {{ province.name }}
            </a-select-option>
          </a-select>
          <a-select
            :class="{ 'lingshu-checkfalse': personalInfo.location_help }"
            v-model="personalInfo.city"
            @change="handlePersonalCityChange"
            :disabled="!personalInfo.province"
            style="width: 190px; margin-left: 15px"
          >
            <a-select-option
              v-for="city in personalInfo.cityData"
              :key="city.id"
              :value="city.name"
            >
              {{ city.name }}
            </a-select-option>
          </a-select>
          <a-select
            :class="{ 'lingshu-checkfalse': personalInfo.location_help }"
            v-model="personalInfo.country"
            :disabled="!personalInfo.city"
            style="width: 190px; margin-left: 15px"
          >
            <a-select-option
              v-for="country in personalInfo.countryData"
              :key="country.id"
              :value="country.name"
            >
              {{ country.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="lingshu-helper">{{ personalInfo.location_help }}</div>

        <!-- 个人详细地址 -->
        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label" style="margin-left 122px">{{ $t('Address') }}</div>
          <div class="textarea-wrap">
            <textarea
              :class="{ 'lingshu-checkfalse': this.personalInfo.address_help }"
              maxlength="200"
              v-model="personalCommit.address"
              class="lingshu-textarea"
              :placeholder="$t('AddressHolder')"
            >
            </textarea>
            <div class="textarea-count">{{ personalTextCount + '/200' }}</div>
          </div>
        </div>
        <div class="lingshu-helper">{{ personalInfo.address_help }}</div>

        <div style="display: flex; margin-top: 26px; margin-left: 343px">
          <div
            class="lingshu-primary-button"
            :class="{ selected: personalInfo.disable === true }"
            @click="handlePersonSubmit"
          >
            {{ $t('Submit') }}
          </div>
          <div style="width: 30px"></div>
          <div class="lingshu-button" @click="handlePersonCancel">{{ $t('Cancel') }}</div>
        </div>
      </div>
    </div>
    <!-------------->
    <!-- 企业认证 -->
    <!-------------->
    <div v-else>
      <div class="lingshu-card2" style="margin-top: 20px">
        <div class="title">{{ $t('EnterpriseInformation') }}</div>

        <!-- 企业名称 -->
        <div class="lingshu-item" style="margin-top: 20px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('EnterpriseName') }}</div>
          <input
            class="lingshu-input"
            :class="{ 'lingshu-checkfalse': this.companyInfo.enterprise_name_help }"
            v-model="companyCommit.enterprise_name"
            :placeholder="$t('EnterpriseNameHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ companyInfo.enterprise_name_help }}</div>

        <!-- 唯一社会信用代码 -->
        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('social_credit_code') }}</div>
          <input
            class="lingshu-input"
            :class="{ 'lingshu-checkfalse': this.companyInfo.social_credit_code_help }"
            v-model="companyCommit.social_credit_code"
            :placeholder="$t('UniqueSocialNumberCodeHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ companyInfo.social_credit_code_help }}</div>

        <!-- 法定代表人 -->
        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('legal_representative') }}</div>
          <input
            class="lingshu-input"
            :class="{ 'lingshu-checkfalse': this.companyInfo.legal_representative_help }"
            v-model="companyCommit.legal_representative"
            :placeholder="$t('LegalRepresentativeHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ companyInfo.legal_representative_help }}</div>

        <!-- 企业证明(三证) -->
        <div style="height: 10px"></div>

        <div style="display: flex">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('EnterpriseCertification') }}</div>
          <div class="upload-outer" style="display: flex; align-items: center">
            <div class="upload-wrap">
              <a-upload
                :accept="accept"
                class="upload-left"
                @change="handleChangeCompany1"
                :beforeUpload="beforeUpload"
                :showUploadList="false"
                action="companyPicUuid-pic1"
                :customRequest="customRequest"
              >
                <div
                  class="upload-left-inner left-picture"
                  :style="{ backgroundImage: 'url(' + companyPic1Left + ')' }"
                >
                  <div :class="{ 'lingshu-hide': companyPic1Left }">
                    <div class="upload-left-inner-plus-prev"></div>
                    <div class="upload-left-inner-plus">+</div>
                    <div class="upload-left-inner-plus-next"></div>
                    <div class="upload-left-inner-text">
                      {{ $t('UploadEnterpriseCertification') }}
                    </div>
                  </div>
                </div>
              </a-upload>
              <div class="upload-right" @click="handleCompanySample1" style="margin-left: 10px">
                <!-- <img :src="personPic1" /> -->
                <div
                  class="right-picture"
                  :style="{ backgroundImage: 'url(' + companyPic1 + ')' }"
                ></div>

                <a class="upload-right-text">{{ $t('samplePicture') }}</a>
              </div>
            </div>
            <div class="lingshu-image-helper">{{ companyPic1Help }}</div>
          </div>
        </div>

        <!-- 图片大小说明 -->
        <div class="picture-format-description">{{ $t('PictureFormatDescription') }}</div>

        <!-- 公司所在地 -->
        <div class="lingshu-item" style="margin-top: 30px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('CompanyLocation') }}</div>
          <a-select
            v-model="companyInfo.province"
            :class="{ 'lingshu-checkfalse': this.companyInfo.location_help }"
            @change="handleCompanyProvinceChange"
            style="width: 190px"
          >
            <a-select-option
              v-for="province in companyInfo.provinceData"
              :key="province.id"
              :value="province.name"
            >
              {{ province.name }}
            </a-select-option>
          </a-select>
          <a-select
            v-model="companyInfo.city"
            :class="{ 'lingshu-checkfalse': this.companyInfo.location_help }"
            @change="handleCompanyCityChange"
            :disabled="!companyInfo.province"
            style="width: 190px; margin-left: 15px"
          >
            <a-select-option v-for="city in companyInfo.cityData" :key="city.id" :value="city.name">
              {{ city.name }}
            </a-select-option>
          </a-select>
          <a-select
            :class="{ 'lingshu-checkfalse': this.companyInfo.location_help }"
            v-model="companyInfo.country"
            :disabled="!companyInfo.city"
            style="width: 190px; margin-left: 15px"
          >
            <a-select-option
              v-for="country in companyInfo.countryData"
              :key="country.id"
              :value="country.name"
            >
              {{ country.name }}
            </a-select-option>
          </a-select>
        </div>

        <div class="lingshu-helper">{{ this.companyInfo.location_help }}</div>

        <!-- 详细地址 -->
        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label" style="margin-left 122px">{{ $t('Address') }}</div>
          <div class="textarea-wrap">
            <textarea
              :class="{ 'lingshu-checkfalse': this.companyInfo.address_help }"
              v-model="companyCommit.address"
              class="lingshu-textarea"
              maxlength="200"
              :placeholder="$t('AddressHolder')"
            ></textarea>
            <div class="textarea-count">{{ companyTextCount + '/200' }}</div>
          </div>
        </div>
        <div class="lingshu-helper">{{ companyInfo.address_help }}</div>
      </div>

      <!-- 管理员 -->
      <div class="lingshu-card" style="margin-top: 20px">
        <div class="title">{{ $t('AdministratorInformation') }}</div>

        <!-- 管理员身份类型 -->
        <div class="lingshu-item" style="margin-top: 28px">
          <div class="lingshu-star" style="line-heigth: unset">*</div>
          <div class="lingshu-label-2">{{ $t('manager_identity') }}</div>
          <a-radio-group v-model="companyCommit.manager_identity">
            <a-radio value="lr">{{ $t('legal_representative') }}</a-radio>
            <a-radio value="em">{{ $t('Staff') }}</a-radio>
          </a-radio-group>
        </div>

        <!-- 真实姓名 -->
        <div class="lingshu-item" style="margin-top: 38px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('real_name') }}</div>
          <input
            class="lingshu-input"
            :class="{ 'lingshu-checkfalse': this.companyInfo.real_name_help }"
            v-model="companyCommit.real_name"
            :placeholder="$t('NameHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ this.companyInfo.real_name_help }}</div>

        <!-- 身份证号 -->
        <div class="lingshu-item" style="margin-top: 10px">
          <div class="lingshu-star">*</div>
          <div class="lingshu-label">{{ $t('id_number') }}</div>
          <input
            class="lingshu-input"
            :class="{ 'lingshu-checkfalse': this.companyInfo.id_number_help }"
            v-model="companyCommit.id_number"
            :placeholder="$t('IdentityNumberHolder')"
          />
        </div>
        <div class="lingshu-helper">{{ this.companyInfo.id_number_help }}</div>

        <!-- 管理员上传图片1 -->
        <div style="height: 10px"></div>
        <div class="upload-outer" style="display: flex; align-items: center; margin-left: 122px">
          <div class="upload-wrap">
            <a-upload
              :accept="accept"
              class="upload-left"
              @change="handleChangeAdmin1"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              action="companyPicUuid-pic2"
              :customRequest="customRequest"
            >
              <div
                class="upload-left-inner left-picture"
                :style="{ backgroundImage: 'url(' + companyPic2Left + ')' }"
              >
                <div :class="{ 'lingshu-hide': companyPic2Left }">
                  <div class="upload-left-inner-plus-prev"></div>
                  <div class="upload-left-inner-plus">+</div>
                  <div class="upload-left-inner-plus-next"></div>
                  <div class="upload-left-inner-text">{{ $t('personPic1') }}</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-right" @click="handleAdminSample1" style="margin-left: 10px">
              <!-- <img :src="personPic1" /> -->
              <div
                class="right-picture"
                :style="{ backgroundImage: 'url(' + adminPic1 + ')' }"
              ></div>

              <a class="upload-right-text">{{ $t('samplePicture') }}</a>
            </div>
          </div>
          <div class="lingshu-image-helper">{{ companyPic2Help }}</div>
        </div>

        <!-- 管理员上传图片2 -->
        <div style="height: 20px"></div>
        <div class="upload-outer" style="display: flex; align-items: center; margin-left: 122px">
          <div class="upload-wrap">
            <a-upload
              :accept="accept"
              class="upload-left"
              @change="handleChangeAdmin2"
              :beforeUpload="beforeUpload"
              :showUploadList="false"
              action="companyPicUuid-pic3"
              :customRequest="customRequest"
            >
              <div
                class="upload-left-inner left-picture"
                :style="{ backgroundImage: 'url(' + companyPic3Left + ')' }"
              >
                <div :class="{ 'lingshu-hide': companyPic3Left }">
                  <div class="upload-left-inner-plus-prev"></div>
                  <div class="upload-left-inner-plus">+</div>
                  <div class="upload-left-inner-plus-next"></div>
                  <div class="upload-left-inner-text">{{ $t('personPic2') }}</div>
                </div>
              </div>
            </a-upload>
            <div class="upload-right" @click="handleAdminSample2" style="margin-left: 10px">
              <!-- <img :src="personPic1" /> -->
              <div
                class="right-picture"
                :style="{ backgroundImage: 'url(' + adminPic2 + ')' }"
              ></div>

              <a class="upload-right-text">{{ $t('samplePicture') }}</a>
            </div>
          </div>
          <div class="lingshu-image-helper">{{ companyPic3Help }}</div>
        </div>

        <!-- 图片大小说明 -->
        <div class="picture-format-description">{{ $t('PictureFormatDescription') }}</div>

        <div style="display: flex; margin-top: 40px; margin-left: 343px">
          <div
            class="lingshu-primary-button"
            :class="{ selected: companyInfo.disable === true }"
            @click="handleCompanySubmit"
            style=""
          >
            {{ $t('Submit') }}
          </div>
          <div style="width: 30px"></div>
          <div class="lingshu-button" @click="handleCompanyCancel">{{ $t('Cancel') }}</div>
        </div>
      </div>
    </div>
    <div v-show="messageShow" class="lingshu-message">
      <div class="messageshow-successed"><img src="@/assets/img/icon/successed.svg" /></div>
      <div>{{ $t('submitSuccess') }}</div>
    </div>
  </div>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

import { userCertify } from '@/services/auth'
import '@/theme/common.css'

import { province } from '@/utils/province'
import { city } from '@/utils/city'
import { country } from '@/utils/country'
import { uploadFile } from '@/services/file'
import BMF from 'browser-md5-file'
import { resCorrect, resCode, resMessage, usernameCheck } from '../../utils/util'

import { getTrack } from '@/utils/util'
import { trackSave } from '@/services/track'

export default {
  name: 'EnterpriseAuthentication',
  i18n: require('./i18n'),
  props: ['developTypeProp'],
  data() {
    return {
      accept: 'image/jpeg,image/jpg,image/png',

      personalInfo: {
        provinceData: province,
        cityData: [],
        countryData: [],
        province: null,
        city: null,
        country: null,
        real_name_help: null,
        id_number_help: null,
        address_help: null,
        location_help: null,
        disable: false,
      },
      personalPic1Left: null,
      personalPic2Left: null,
      personalPic3Left: null,

      companyInfo: {
        provinceData: province,
        cityData: [],
        countryData: [],
        province: null,
        city: null,
        country: null,
        enterprise_name_help: null,
        social_credit_code_help: null,
        legal_representative_help: null,
        address_help: null,
        real_name_help: null,
        id_number_help: null,
        location_help: null,
        disable: false,
      },
      companyPic1Left: null,
      companyPic2Left: null,
      companyPic3Left: null,

      personalCommit: {
        identity: 'individual',
        real_name: null,
        id_number: null,
        id_card_front_id: null,
        id_card_back_id: null,
        id_card_half_body_id: null,
        company_location: null,
        address: null,
      },

      companyCommit: {
        identity: 'oem',
        enterprise_name: null, // 企业名称
        social_credit_code: null, // 唯一社会信用代码
        legal_representative: null, // 法定代表人
        enterprise_certification_id: null, // 三证 ***
        company_location: null, // 公司所在地 ***
        address: null, // 详细地址
        manager_identity: 'lr', // 管理员身份类型
        real_name: null, // 真实姓名
        id_number: null, // 身份证号
        id_card_front_id: null, // 身份证正面 ***
        id_card_back_id: null, // 身份证反面 ***
      },

      info: {},
      personalForm: this.$form.createForm(this, { name: 'dynamic_rule' }),

      // picture start
      personPic1: require('@/assets/img/icon/idfront.svg'),
      personPic2: require('@/assets/img/icon/idback.svg'),
      personPic3: require('@/assets/img/icon/handid.svg'),

      personalPic1Help: null,
      personalPic2Help: null,
      personalPic3Help: null,

      adminPic1: require('@/assets/img/icon/idfront.svg'),
      adminPic2: require('@/assets/img/icon/idback.svg'),

      companyPic2Help: null,
      companyPic3Help: null,

      companyPic1: require('@/assets/img/icon/businesslicense.svg'),

      companyPic1Help: null,

      personalPic1HelpTmp: null,
      personalPic2HelpTmp: null,
      personalPic3HelpTmp: null,
      companyPic1HelpTmp: null,
      companyPic2HelpTmp: null,
      companyPic3HelpTmp: null,

      // picture end

      currentSamplePicture: null,

      developType: null,
      developTypeTemp: null,
      selectTypeShow: false,
      displaySamplePicture: false,
      isAuthentication: false,
      personPicUuid: {
        pic1: null,
        pic2: null,
        pic3: null,
      },
      companyPicUuid: {
        pic1: null,
        pic2: null,
        pic3: null,
      },
      messageShow: false,
    }
  },
  computed: {
    personalTextCount: function () {
      if (!this.personalCommit.address) return 0
      return this.personalCommit.address.length
    },
    companyTextCount: function () {
      if (!this.companyCommit.address) return 0
      return this.companyCommit.address.length
    },
  },

  created() {},

  mounted() {
    this.developType = this.getDevelopType()
  },

  methods: {
    getDevelopType() {
      let type = this.$store.getters['account/user'].type
      if (type !== 'oem' && type !== 'individual' && type !== 'ent') {
        type = 'oem'
      }
      return type
    },
    /*******************/
    /* personal select */
    /*******************/

    handlePersonalProvinceChange(value, opt) {
      value
      this.personalInfo.cityData = city[opt.key]
      this.personalInfo.city = null
      // TODO city country 数据 与 表示 调整
    },
    handlePersonalCityChange(value, opt) {
      value
      this.personalInfo.countryData = country[opt.key]
      this.personalInfo.country = null
      // TODO country 数据 与 表示 调整
    },

    /******************/
    /* company select */
    /******************/

    handleCompanyProvinceChange(value, opt) {
      value
      this.companyInfo.cityData = city[opt.key]
      this.companyInfo.city = null
      // TODO city country 数据 与 表示 调整
    },
    handleCompanyCityChange(value, opt) {
      value
      this.companyInfo.countryData = country[opt.key]
      this.companyInfo.country = null
      // TODO country 数据 与 表示 调整
    },

    handleSample1() {
      if (this.personPic1) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.personPic1
      }
    },
    handleSample2() {
      if (this.personPic2) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.personPic2
      }
    },
    handleSample3() {
      if (this.personPic3) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.personPic3
      }
    },
    handleCompanySample1() {
      if (this.companyPic1) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.companyPic1
      }
    },
    handleAdminSample1() {
      if (this.adminPic1) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.adminPic1
      }
    },
    handleAdminSample2() {
      if (this.adminPic2) {
        this.displaySamplePicture = true
        this.currentSamplePicture = this.adminPic2
      }
    },
    handlePersonCancel() {
      this.goAccountAuthentication()
    },
    goAccountAuthentication() {
      this.$router.push({ path: '/personal/account_management/account_authentication' })
    },
    handlePersonSubmit() {
      const that = this
      if (this.personalInfo.disable) {
        return
      }
      if (this.personalCheck()) {
        let { real_name, id_number, address } = this.personalCommit
        const { pic1, pic2, pic3 } = this.personPicUuid
        const { province, city, country } = this.personalInfo
        this.personalCommit.company_location = `${province}-${city}-${country}`
        const { company_location } = this.personalCommit

        real_name = real_name.trim()
        id_number = id_number.trim()
        address = address.trim()

        const personparams = {
          identity: this.developType,
          real_name,
          id_number,
          id_card_front_id: pic1,
          id_card_back_id: pic2,
          id_card_half_body_id: pic3,
          company_location,
          address,
        }
        this.personalInfo.disable = true
        userCertify(personparams).then((res) => {
          this.$log.info('userCertify: ' + JSON.stringify(res))
          if (resCorrect(res)) {
            const IdentificationData = {}
            const trackData = getTrack('webClick', 'Identification', IdentificationData)
            trackSave(trackData).then((r) => {
              this.$log.debug('trackSave', r)
            })

            const code = resCode(res)
            if (code === 0) {
              this.$store.dispatch('account/getUserInfo')
              this.showMessage()
              setTimeout(() => {
                that.goAccountAuthentication()
              }, 1000)
            } else {
              this.$message.error(resMessage(res))
              this.personalInfo.disable = false
            }
          } else {
            this.$message.error(resMessage(res))
            this.personalInfo.disable = false
          }
        })
      }
    },

    /*********/
    /* Check */
    /*********/

    /* 姓名：只限输入中文和英文，字符限制为2-16个中文字符 */
    // nameCheck(str) {
    //   return /^[\u4E00-\u9FA5A-Za-z]{2,16}$/.test(str)
    // },

    /* 身份证号：只限输入数字和英文，输入上限为18个字符，若输入不满18个字符，则报错，文案为“身份证格式错误” */
    idNumberCheck(str) {
      // const reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/
      const reg = /^[A-Za-z0-9]{18}$/
      return reg.test(str)
    },

    // /* 详细地址：允许输入200字符以内 */
    // addressCheck(str) {
    //   // return /^[\u4E00-\u9FA5A-Za-z0-9]{1,200}$/.test(str)
    //   return str.length <= 200
    // },

    /* .企业名称：只限输入中文、英文、数字，输入上限为50个字符 */
    companyNameCheck(str) {
      return /^[\u4E00-\u9FA5A-Za-z0-9]{1,50}$/.test(str)
    },

    /* 统一社会信用代码：只限输入英文、数字，输入上限为18个字符 */
    socialCreditCodeCheck(str) {
      return /^[\u4E00-\u9FA5A-Za-z0-9]{1,18}$/.test(str)
    },

    /* 法定代表人：只限输入中文、英文，输入上限为20个字符 */
    // legalRepresentativeCheck(str) {
    //   return /^[\u4E00-\u9FA5A-Za-z]{1,20}$/.test(str)
    // },

    personalCheck() {
      const { real_name, id_number, address } = this.personalCommit
      const { province, city, country } = this.personalInfo
      const { pic1, pic2, pic3 } = this.personPicUuid

      // this.personalInfo.real_name_help = !real_name && this.nameCheck(real_name) ? this.$t('NameHelp') : null
      if (real_name) {
        if (usernameCheck(real_name)) {
          this.personalInfo.real_name_help = null
        } else {
          this.personalInfo.real_name_help = this.$t('wrongFormat')
        }
      } else {
        this.personalInfo.real_name_help = this.$t('NameHelp')
      }

      // this.personalInfo.id_number_help = !this.idNumberCheck(id_number)
      if (id_number) {
        if (this.idNumberCheck(id_number)) {
          this.personalInfo.id_number_help = null
        } else {
          this.personalInfo.id_number_help = this.$t('wrongFormat')
        }
      } else {
        this.personalInfo.id_number_help = this.$t('IdentityNumberHelp')
      }

      // this.personalInfo.address_help = !address ? this.$t('AddressHelp') : null
      if (address) {
        this.personalInfo.address_help = null
        // if (this.addressCheck(address)) {
        //   this.personalInfo.address_help = null
        // } else {
        //   this.personalInfo.address_help = this.$t('wrongFormat')
        // }
      } else {
        this.personalInfo.address_help = this.$t('AddressHelp')
      }

      this.personalInfo.location_help =
        !province || !city || !country ? this.$t('CompanyLocationHelp') : null

      // this.personalPic1Help = !pic1 ? this.$t('personalPic1Help') : null
      // this.personalPic2Help = !pic2 ? this.$t('personalPic2Help') : null
      // this.personalPic3Help = !pic3 ? this.$t('personalPic3Help') : null

      if (this.personalPic1HelpTmp) {
        this.personalPic1Help = this.personalPic1HelpTmp
      } else {
        if (pic1) {
          this.personalPic1Help = null
        } else {
          this.personalPic1Help = this.$t('personalPic1Help')
        }
      }

      if (this.personalPic2HelpTmp) {
        this.personalPic2Help = this.personalPic2HelpTmp
      } else {
        if (pic2) {
          this.personalPic2Help = null
        } else {
          this.personalPic2Help = this.$t('personalPic2Help')
        }
      }

      if (this.personalPic3HelpTmp) {
        this.personalPic3Help = this.personalPic3HelpTmp
      } else {
        if (pic3) {
          this.personalPic3Help = null
        } else {
          this.personalPic3Help = this.$t('personalPic3Help')
        }
      }

      const { real_name_help, id_number_help, address_help, location_help } = this.personalInfo
      if (
        real_name_help ||
        id_number_help ||
        address_help ||
        location_help ||
        this.personalPic1Help ||
        this.personalPic2Help ||
        this.personalPic3Help
      ) {
        return false
      } else {
        return true
      }
    },

    companyCheck() {
      const {
        enterprise_name,
        social_credit_code,
        legal_representative,
        address,
        real_name,
        id_number,
      } = this.companyCommit
      const { province, city, country } = this.companyInfo
      const { pic1, pic2, pic3 } = this.companyPicUuid

      // this.companyInfo.enterprise_name_help = !enterprise_name
      //   ? this.$t('EnterpriseNameHelp')
      //   : null
      if (enterprise_name) {
        if (this.companyNameCheck(enterprise_name)) {
          this.companyInfo.enterprise_name_help = null
        } else {
          this.companyInfo.enterprise_name_help = this.$t('wrongFormat')
        }
      } else {
        this.companyInfo.enterprise_name_help = this.$t('EnterpriseNameHelp')
      }

      // this.companyInfo.= !
      //   ? this.$t('UniqueSocialNumberCodeHelp')
      //   : null
      if (social_credit_code) {
        if (this.socialCreditCodeCheck(social_credit_code)) {
          this.companyInfo.social_credit_code_help = null
        } else {
          this.companyInfo.social_credit_code_help = this.$t('wrongFormat')
        }
      } else {
        this.companyInfo.social_credit_code_help = this.$t('UniqueSocialNumberCodeHelp')
      }

      // this.companyInfo.= !
      //   ? this.$t('')
      //   : null
      if (legal_representative) {
        if (usernameCheck(legal_representative)) {
          this.companyInfo.legal_representative_help = null
        } else {
          this.companyInfo.legal_representative_help = this.$t('wrongFormat')
        }
      } else {
        this.companyInfo.legal_representative_help = this.$t('LegalRepresentativeHelp')
      }

      // this.companyInfo.= !? this.$t('') : null
      if (address) {
        this.companyInfo.address_help = null
        // if (this.addressCheck(address)) {
        //   this.companyInfo.address_help = null
        // } else {
        //   this.companyInfo.address_help = this.$t('wrongFormat')
        // }
      } else {
        this.companyInfo.address_help = this.$t('AddressHelp')
      }

      // this.companyInfo.= !? this.$t('') : null
      if (real_name) {
        if (usernameCheck(real_name)) {
          this.companyInfo.real_name_help = null
        } else {
          this.companyInfo.real_name_help = this.$t('wrongFormat')
        }
      } else {
        this.companyInfo.real_name_help = this.$t('NameHelp')
      }

      // this.companyInfo.= !this.idNumberCheck()
      //   ? this.$t('')
      //   : null
      if (id_number) {
        if (this.idNumberCheck(id_number)) {
          this.companyInfo.id_number_help = null
        } else {
          this.companyInfo.id_number_help = this.$t('wrongFormat')
        }
      } else {
        this.companyInfo.id_number_help = this.$t('IdentityNumberHelp')
      }

      this.companyInfo.location_help =
        !province || !city || !country ? this.$t('CompanyLocationHelp') : null

      // this.companyPic1Help = !pic1 ? this.$t('companyPic1Help') : null
      // this.companyPic2Help = !pic2 ? this.$t('personalPic1Help') : null
      // this.companyPic3Help = !pic3 ? this.$t('personalPic2Help ') : null

      if (this.companyPic1HelpTmp) {
        this.companyPic1Help = this.companyPic1HelpTmp
      } else {
        if (pic1) {
          this.companyPic1Help = null
        } else {
          this.companyPic1Help = this.$t('companyPic1Help')
        }
      }

      if (this.companyPic2HelpTmp) {
        this.companyPic2Help = this.companyPic2HelpTmp
      } else {
        if (pic2) {
          this.companyPic2Help = null
        } else {
          this.companyPic2Help = this.$t('personalPic1Help')
        }
      }

      if (this.companyPic3HelpTmp) {
        this.companyPic3Help = this.companyPic3HelpTmp
      } else {
        if (pic3) {
          this.companyPic3Help = null
        } else {
          this.companyPic3Help = this.$t('personalPic2Help')
        }
      }

      const {
        enterprise_name_help,
        social_credit_code_help,
        legal_representative_help,
        address_help,
        real_name_help,
        id_number_help,
        location_help,
      } = this.companyInfo
      if (
        enterprise_name_help ||
        social_credit_code_help ||
        legal_representative_help ||
        address_help ||
        real_name_help ||
        id_number_help ||
        location_help ||
        this.companyPic1Help ||
        this.companyPic2Help ||
        this.companyPic3Help
      ) {
        return false
      } else {
        return true
      }
    },

    handleCompanyCancel() {
      this.goAccountAuthentication()
    },

    handleCompanySubmit() {
      const that = this
      if (this.companyInfo.disable) {
        return
      }
      if (this.companyCheck()) {
        let {
          // identity,
          real_name,
          id_number,
          address,
          enterprise_name,
          social_credit_code,
          legal_representative,
        } = this.companyCommit
        const { manager_identity } = this.companyCommit

        const { pic1, pic2, pic3 } = this.companyPicUuid
        const { province, city, country } = this.companyInfo
        this.companyCommit.company_location = `${province}-${city}-${country}`
        const { company_location } = this.companyCommit

        real_name = real_name.trim()
        id_number = id_number.trim()
        address = address.trim()
        enterprise_name = enterprise_name.trim()
        social_credit_code = social_credit_code.trim()
        legal_representative = legal_representative.trim()

        const companyparams = {
          identity: this.developType,
          real_name,
          id_number,
          enterprise_certification_id: pic1,
          id_card_front_id: pic2,
          id_card_back_id: pic3,
          company_location,
          address,
          enterprise_name,
          social_credit_code,
          legal_representative,
          manager_identity,
        }

        this.companyInfo.disable = true

        userCertify(companyparams).then((res) => {
          this.$log.info('userCertify: ' + JSON.stringify(res))
          if (resCorrect(res)) {
            const IdentificationData = {}
            const trackData = getTrack('webClick', 'Identification', IdentificationData)
            trackSave(trackData).then((r) => {
              this.$log.debug('trackSave', r)
            })

            const code = resCode(res)
            if (code === 0) {
              this.$store.dispatch('account/getUserInfo')
              this.showMessage()
              setTimeout(() => {
                that.goAccountAuthentication()
              }, 1000)
            } else {
              this.$message.error(resMessage(res))
              this.companyInfo.disable = false
            }
          } else {
            this.$message.error(resMessage(res))
            this.companyInfo.disable = false
          }
        })
      }
    },

    /************/
    /* 上传图片 */
    /************/

    handleChangePerson1() {},
    handleChangePerson2() {},
    handleChangePerson3() {},
    handleChangeCompany1() {},
    handleChangeAdmin1() {},
    handleChangeAdmin2() {},

    beforeUpload(file) {
      this.$log.info(file)
      return true
    },
    checkPicture(file, attrName) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        this[attrName + 'HelpTmp'] = null
        this[attrName + 'Help'] = null
      } else {
        this[attrName + 'HelpTmp'] = this.$t('wrongFormat')
        this[attrName + 'Help'] = this.$t('wrongFormat')
        return false
      }
      if (file.size > 3 * 1024 * 1024) {
        this[attrName + 'HelpTmp'] = this.$t('wrongSize')
        this[attrName + 'Help'] = this.$t('wrongSize')
        return false
      } else {
        this[attrName + 'HelpTmp'] = null
        this[attrName + 'Help'] = null
      }
      return true
    },
    typeIndexToName(type, index) {
      if (type === 'personPicUuid') {
        type = 'personal'
      } else {
        type = 'company'
      }
      return type + 'P' + index.substr(1)
    },
    customRequest(data) {
      const that = this
      const arr = data.action.split('-')
      const type = arr[0]
      const index = arr[1]
      const file = data.file
      const attrName = this.typeIndexToName(type, index)

      this[attrName + 'HelpTmp'] = null // clear
      if (!this.checkPicture(file, attrName)) {
        return
      }

      const bmf = new BMF()
      bmf.md5(file, (err, md5) => {
        this.$log.info(md5)
        // this.fileMd5 = md5
        const formData = new FormData()
        formData.append('file_md5', md5)
        formData.append('file', file)
        formData.append('storage_type', 'AUTH')
        uploadFile(formData).then((res) => {
          if (resCorrect(res)) {
            const code = resCode(res)
            if (code === 0) {
              getBase64(data.file, function (imageUrl) {
                that[attrName + 'Left'] = imageUrl
              })

              if (type === 'personPicUuid') {
                this.personPicUuid[index] = res.data.data.uuid
              } else {
                this.companyPicUuid[index] = res.data.data.uuid
              }
              this.$log.info('this.personPicUuid: ' + JSON.stringify(this.personPicUuid))
              this.$log.info('this.companyPicUuid: ' + JSON.stringify(this.companyPicUuid))
              this.$log.info('sucuess')
            } else {
              this.$message.error(resMessage(res))
            }
          } else {
            this.$message.error(resMessage(res))
          }
        })
      })
    },

    /************/
    /* 修改身份 */
    /************/

    handleModifyIdentity() {
      this.selectTypeShow = true
      this.developTypeTemp = this.developType
      //alert("handleModifyIdentity");
    },

    /************/
    /* 类型选择 */
    /************/

    handleOEMTIER() {
      this.developTypeTemp = 'oem'
      this.companyCommit.identity = 'oem'
    },
    handleTechnologyCompany() {
      this.developTypeTemp = 'ent'
      this.companyCommit.identity = 'ent'
    },
    handleGeekDeveloper() {
      this.developTypeTemp = 'individual'
      this.personalCommit.identity = 'individual'
    },

    handleOk() {
      this.developType = this.developTypeTemp
      this.selectTypeShow = false
    },
    handleCancel() {
      this.selectTypeShow = false
    },

    /************/
    /* 查看大图 */
    /************/

    handleBigPictureCancel() {
      this.displaySamplePicture = false
    },

    showMessage() {
      this.messageShow = true
      this.messageTimer = setTimeout(() => {
        this.messageShow = false
      }, 1000)
    },
  },
  // components: {Trend, SalesData, HotSearch, RankingList, Bar, MiniProgress, MiniBar, MiniArea, ChartCard}
  components: {},
}
</script>

<style lang="less" scoped>
.upload-wrap {
  display: flex;
  // border: 1px solid gray;
}

.upload-left {
  flex: 1;
  display: flex;
  flex-flow: column;
  height: 90px;
  width: 180px;
  overflow: hidden;
}

.upload-left,
.upload-right {
  background: #fbfbfb;
  border: 1px solid #dedede;
}

.upload-left {
  cursor: pointer;
}

.right-picture {
  background-size: 100% 100%;
}

.left-picture {
  background-size: 100% 100% !important;
}

.upload-left-inner {
  box-sizing: border-box;
  height: 90px;
  width: 100%;
  // display: flex;
  // flex-flow: column;
  // justify-content: center;
  background: #fbfbfb;
}

.upload-left-inner-plus,
.upload-left-inner-text {
  margin: 0 auto;

  // font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #aeaeae;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
}

.upload-left-inner-plus {
  font-size: 20px;
}

.upload-right-text {
  margin: 0 auto;

  height: 17px;
  // font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #3371ff;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;

  margin: 0 auto;
  display: block;
}

.upload-right {
  flex: 1;
  // border-left: 1px solid gray;
  // display: flex;
  // flex-flow: column;
  // justify-content: space-around;
  height: 90px;
  width: 180px;
}

.upload-left-inner-plus-prev {
  height: 15px;
}

.upload-left-inner-plus-next {
  height: 4px;
}

.upload-right > div {
  margin: 0 auto;
  object-fit: fill;

  width: 86px;
  height: 54px;
  margin: 9px;
  margin-top: 10%;
  margin: 0 auto;
  margin-top: 9px;
}

.selected {
  // background: lightblue;
}

.sample-picture {
  max-height: 100%;
  max-width: 100%;
  margin: auto;
}

.extra-wrap {
  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a:not(:first-child) {
      margin-left: 24px;
    }
  }
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.lingshu-card {
  background-color: #ffffff;
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 32px;
}

.lingshu-card2 {
  background-color: #ffffff;
  padding-top: 30px;
  // padding-bottom: 30px;
  padding-left: 32px;
}

/************/
/* 类型选择 */
/************/

.lingshu-select-type {
  width: 100px;
  height: 100px;
  // background: red;
  margin: 0 auto;
  margin-top: 20px;
}

.lingshu-auth .select-type {
  width: 700px;
  height: 333px;
  margin: 0 auto;
  margin-top: 210px;
  background: #ffffff;
  position: relative;
}

.lingshu-auth .big-picture {
  width: 500px;
  height: 300px;
  background: #ffffff;
  margin: 0 auto;
  margin-top: 210px;
  position: relative;
}
.lingshu-auth .big-picture-image {
  background-size: 100% 100%;
}

.lingshu-auth .close {
  position: absolute;
  // background: green;
  width: 12px;
  height: 12px;
  right: 20px;
  top: 20px;
}
.lingshu-auth .select-type .type-title {
  padding-top: 40px;
  text-align: center;
  margin-bottom: 33px;

  height: 25px;
  // font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #131313;
  letter-spacing: 0;
  text-align: center;
  font-weight: 500;
}
.lingshu-auth .three-type-wrap {
  display: flex;
}

.lingshu-auth .three-type-wrap .type {
  flex: 1;
  text-align: center;
  cursor: pointer;
}

.lingshu-auth .type-image {
  width: 70px;
  height: 70px;
  // border: 1px solid red;
}

.lingshu-auth .three-type-wrap .type-name {
  // width: 100%;
  height: 30px;
  line-height: 20px;

  // font-family: PingFangSC-Regular;
  font-size: 14px;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;

  // border: 1px solid red;

  margin-top: 6px;
}

.lingshu-auth .three-type-wrap .type-description {
  width: 150px;
  height: 34px;
  font-size: 12px;
  color: #646464;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;
  margin: 0 auto;
  margin-top: 6px;
}

.lingshu-auth .title {
  height: 22px;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
  .customer-font-bold();
}
.lingshu-auth .selected .type-name {
}

.lingshu-card .type-name {
  height: 22px;
  font-size: 16px;
  color: #000000;
  letter-spacing: 0;
}

.lingshu-card .modify-identity-description {
  height: 20px;
  font-size: 14px;
  color: #aeaeae;
  letter-spacing: 0;
  margin-top: 4px;
}

.lingshu-auth .lingshu-item {
  display: flex;
}

.lingshu-auth .lingshu-label {
  max-width: 112px;
  width: 122px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #131313;
  letter-spacing: 0;
}

.lingshu-auth .lingshu-label-2 {
  max-width: 112px;
  width: 122px;
  font-size: 14px;
  color: #131313;
  letter-spacing: 0;
}

.lingshu-auth .lingshu-input {
  width: 600px;
  border: 1px solid #dedede;
  padding-left: 10px;
  height: 36px;
}

.lingshu-auth .lingshu-input.lingshu-checkfalse {
  border: 1px solid #ff2710;
}

.lingshu-auth .lingshu-input:focus {
  outline: none !important;
}

.lingshu-auth .lingshu-input::placeholder {
  height: 17px;
  font-size: 12px;
  color: #aeaeae;
  letter-spacing: 0;
}

.lingshu-auth textarea {
  padding-top: 10px;
  padding-left: 10px;
}

.lingshu-auth textarea::placeholder {
  height: 17px;
  font-size: 12px;
  color: #aeaeae;
  letter-spacing: 0;
}

.lingshu-auth .lingshu-helper {
  height: 17px;
  font-size: 12px;
  color: #ff2710;
  letter-spacing: 0;

  margin-top: 2px;
  margin-left: 122px;
}

.lingshu-auth .lingshu-image-helper {
  margin-left: 2px;
  height: 17px;
  font-size: 12px;
  color: #ff2710;
  letter-spacing: 0;
}

.lingshu-auth .picture-format-description {
  margin-left: 122px;
  margin-top: 6px;

  height: 17px;
  font-size: 12px;
  color: #aeaeae;
  letter-spacing: 0;
}
.messageshow-successed {
  width: 16px;
  height: 16px;
  margin-right: 9px;
}
</style>

<style>
/* .ant-select-dropdown-menu {
  max-height: 180px !important;
  color: #646464 !important;
}

.ant-select-dropdown {
  border-radius: 8px !important;
  overflow: hidden !important;
}

.ant-select-dropdown-menu {
  padding: unset !important;
}

.ant-select-dropdown-menu::-webkit-scrollbar {
  width: 8px !important;
}

.ant-select-dropdown-menu::-webkit-scrollbar-thumb {
  background: #e4e4e4 !important;
}

.ant-select-dropdown-menu::-webkit-scrollbar-track {
  background: #f2f2f2 !important;
}

.ant-select-dropdown-menu-item {
  height: 35px !important;
  border-bottom: 1px solid #f2f2f2;
  line-height: 35px !important;
  padding: unset !important;
  padding-left: 20px !important;
}

.ant-select-dropdown-menu-item-active {
  color: #3371ff;
  background-color: unset !important;
}

.ant-select-dropdown-menu-item-selected.ant-select-dropdown-menu-item-active {
  background-color: #3371ff !important;
  color: #ffffff !important;
}

.ant-select-dropdown-menu-item-selected {
  background-color: #3371ff;
  color: #ffffff !important;
} */

.ant-select-arrow-icon {
  background-image: url('../../assets/img/icon/list-down.svg');
  margin-top: 3px;
  width: 8px;
  height: 6px;
}

.ant-select-arrow-icon > svg {
  display: none;
}

.lingshu-auth .ant-select-selection {
  height: 36px;
}

.lingshu-auth .ant-select-selection__rendered {
  height: 36px;
}

.lingshu-auth .ant-select-selection-selected-value {
  height: 36px;
  line-height: 36px;
}

.lingshu-auth .ant-select-open .ant-select-selection {
  box-shadow: unset;
}

.lingshu-auth .ant-select-focused .ant-select-selection {
  box-shadow: unset;
}

.lingshu-auth .ant-select-selection:hover {
  border: 1px solid #dedede;
  border-right-width: 0px;
}

.lingshu-auth .ant-select-selection {
  border: 1px solid #dedede;
  border-radius: 0px;
}

/* .lingshu-auth .ant-select-selection.lingshu-checkfalse {
  border: 1px solid #FF2710;
} */

.lingshu-auth .lingshu-checkfalse .ant-select-selection {
  border: 1px solid #ff2710;
}

.lingshu-auth .ant-select-selection--single {
  position: unset;
}
.lingshu-auth .lingshu-star {
  width: 10px;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  color: #fa3b3b;
  letter-spacing: 0;
  font-weight: 400;
}

/* textarea */

.lingshu-textarea {
  position: relative;
  width: 600px;
  height: 120px;
  resize: none;
  border: 1px solid #dedede;
}

.lingshu-textarea:focus {
  border: 1px solid #dedede;
  outline: none !important;
  /* box-shadow: 0 0 10px #719ECE; */
}

.lingshu-textarea:after {
  /* content: attr(data-maxnum); */
  /* content: "xxxxxx"; */
  /* position: absolute; */
  content: 'abc';
  right: 5px;
  bottom: 0px;
  font-size: 12px;
}

.lingshu-textarea.lingshu-checkfalse {
  border: 1px solid #ff2710;
}

.textarea-wrap {
  position: relative;
}

.textarea-count {
  position: absolute;
  bottom: 10px;
  right: 10px;

  /* font-family: PingFangSC-Regular; */
  font-size: 12px;
  color: #aeaeae;
  letter-spacing: 0;
  text-align: right;
  font-weight: 400;
}

.lingshu-button-light-type {
  display: inline-block;
  padding: 5px 24px;
  /* border: 1px solid #d8d8d8; */
  border-radius: 25px;

  height: 20px;
  /* font-family: PingFangSC-Regular; */
  font-size: 14px;
  /* color: #3371FF; */
  color: #131313;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;

  /* background: #ECF2FF; */
  cursor: pointer;
}

.selected .lingshu-button-light-type {
  display: inline-block;
  padding: 5px 24px;
  /* border: 1px solid #d8d8d8; */
  border-radius: 25px;

  height: 20px;
  /* font-family: PingFangSC-Regular; */
  font-size: 14px;
  color: #3371ff;
  letter-spacing: 0;
  text-align: center;
  font-weight: 400;

  background: #ecf2ff;
  cursor: pointer;
}

.selected .type-description {
  color: #3371ff !important;
}

.lingshu-primary-button.selected {
  background: #aeaeae;
}

.lingshu-hide {
  visibility: hidden;
}
</style>
